import React, { useEffect, useRef, useState } from "react";
import frame01 from "../../assets/images/gl/textures/frame01.png";
import frame02 from "../../assets/images/gl/textures/frame02.png";
import frame03 from "../../assets/images/gl/textures/frame03.png";
import frame04 from "../../assets/images/gl/textures/frame04.png";
import { CycleCharacterScrollWrap } from "../../styles/Home.style";

type CycleCharacterScrollProps = {
  scrollY: number;
};

const numFrames = 4; // 실제 프레임 수
const textureUrls = [frame01, frame02, frame03, frame04];

const CycleCharacterScroll: React.FC<CycleCharacterScrollProps> = ({
  scrollY,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const currentFrameRef = useRef(0);
  const lastScrollY = useRef(scrollY);
  const lastFrameChangeTime = useRef(0);
  const frameChangeInterval = 100; // 100ms 이상 지나야 다음 프레임 변경

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // 셰이더 소스
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
        v_texCoord = (a_position + 1.0) / 2.0;
      }
    `;

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

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTextureLoc = gl.getUniformLocation(program, "u_texture");
    if (!uTextureLoc) return; // location 유효성 먼저 체크
    gl.uniform1i(uTextureLoc, 0);

    const textures: WebGLTexture[] = [];

    function loadTexture(url: string, index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => {
          if (!gl) {
            resolve();
            return;
          }
          const tex = gl.createTexture();
          if (!tex) {
            resolve();
            return;
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
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
          textures[index] = tex;
          resolve();
        };
      });
    }

    async function loadAllTextures() {
      for (let i = 0; i < numFrames; i++) {
        await loadTexture(textureUrls[i], i);
      }
    }

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = "11.5%";
      const aspectRatio = 1;

      const cssWidth = canvas.parentElement?.clientWidth
        ? canvas.parentElement.clientWidth * 0.115
        : window.innerWidth * 0.115;

      const cssHeight = cssWidth / aspectRatio;
      canvas.style.height = `${cssHeight}px`;

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);

      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function render() {
      if (textures.length !== numFrames) return;
      if (!gl) return;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.bindTexture(gl.TEXTURE_2D, textures[currentFrameRef.current]);
      gl.uniform1i(uTextureLoc, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(render);
    }

    loadAllTextures().then(() => {
      requestAnimationFrame(render);
    });

    return () => {
      window.removeEventListener("resize", resize);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      textures.forEach((t) => gl.deleteTexture(t));
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    };
  }, []);

  // scrollY 변경에 따라 프레임 전환 제한
  useEffect(() => {
    const frameChangeInterval = 100; // 100ms
    const now = performance.now();

    if (
      Math.abs(scrollY - lastScrollY.current) > 15 &&
      now - lastFrameChangeTime.current > frameChangeInterval
    ) {
      const nextFrame = (currentFrameRef.current + 1) % numFrames;
      currentFrameRef.current = nextFrame;
      setCurrentFrame(nextFrame);
      lastScrollY.current = scrollY;
      lastFrameChangeTime.current = now;
    }
  }, [scrollY]);

  return (
    <CycleCharacterScrollWrap
      ref={canvasRef}
      className="cycle-character-scroll-item"
    />
  );
};

export default CycleCharacterScroll;
