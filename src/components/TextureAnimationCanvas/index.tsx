import React, { useEffect, useRef } from "react";
import frame01 from "../../assets/images/gl/textures/plSheet.png";
import frame02 from "../../assets/images/gl/textures/plSheet.png";
import frame03 from "../../assets/images/gl/textures/plSheet.png";
import frame04 from "../../assets/images/gl/textures/plSheet.png";

const numFrames = 4; // 실제 프레임 수와 맞춤
const textureUrls = [frame01, frame02, frame03, frame04];

const TextureAnimationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // 정점 셰이더
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
        v_texCoord = (a_position + 1.0) / 2.0;
      }
    `;

    // 프래그먼트 셰이더
    const fragmentShaderSource = `
      precision mediump float;
      uniform sampler2D u_texture;
      varying vec2 v_texCoord;
      void main() {
        gl_FragColor = texture2D(u_texture, v_texCoord);
      }
    `;

    function compileShader(type: number, source: string): WebGLShader | null {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // 버퍼 설정
    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, "a_position");
    if (aPositionLoc === -1) return;
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const textures: WebGLTexture[] = [];

    function loadTexture(url: string, index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (!gl) {
            resolve();
            return;
          }
          const texture = gl.createTexture();
          if (!texture) {
            resolve();
            return;
          }
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img
          );
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          textures[index] = texture;
          resolve();
        };
      });
    }

    async function loadAllTextures() {
      for (let i = 0; i < numFrames; i++) {
        await loadTexture(textureUrls[i], i);
      }
    }

    let currentFrame = 0;
    let lastFrameTime = 0;
    const frameDuration = 100; // 100ms = 10fps 속도 (필요시 조정)

    function render(now?: number) {
      if (!now) now = 0;
      if (!lastFrameTime) lastFrameTime = now;
      const elapsed = now - lastFrameTime;

      if (elapsed > frameDuration) {
        currentFrame = (currentFrame + 1) % numFrames;
        lastFrameTime = now;
      }

      if (!gl) return;

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (textures.length === numFrames) {
        gl.bindTexture(gl.TEXTURE_2D, textures[currentFrame]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      requestAnimationFrame(render);
    }

    function resize() {
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;

      const width = window.innerWidth * 2 * dpr;

      const aspectRatio = 1920 / 3700; // 가로 / 세로 비율
      const height = width / aspectRatio;

      canvas.width = width;
      canvas.height = height;

      canvas.style.width = window.innerWidth * 2 + "px";
      canvas.style.height = height / dpr + "px";

      if (gl) {
        gl.viewport(0, 0, width, height);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    loadAllTextures().then(() => {
      requestAnimationFrame(render);
    });

    return () => {
      window.removeEventListener("resize", resize);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      textures.forEach((texture) => gl.deleteTexture(texture));
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      className="texture-animation-canvas"
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
};

export default TextureAnimationCanvas;
