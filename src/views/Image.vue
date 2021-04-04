<template>
  <div>
    <header>
      <h2>New image</h2>
      <button @click="backHome()">←</button>
    </header>
    <main>
      <div class="image-size">
        <div class="figure">
          <button class="pencil" @click="figure = 'pencil'">∼</button>
          <button class="line" @click="figure = 'line'">/</button>
          <button class="circle" @click="figure = 'circle'">◯</button>
          <button class="rectangle" @click="figure = 'rectangle'">▭</button>
        </div>
        <canvas ref="canvas" width="650" height="500"></canvas>
        <div class="options">
          <div class="options-for-figure">
            <button class="color" @click="isColorWindow = !isColorWindow">
              Color
            </button>
            <button class="size" @click="isSizeWindow = !isSizeWindow">
              Size
            </button>
          </div>
          <div v-if="isSizeWindow" class="options-for-figure">
            <button v-for="item in allSize" :key="item" @click="size = item">
              {{ item }}
            </button>
          </div>
          <div v-if="isColorWindow" class="options-for-figure">
            <button
              v-for="item in allColor"
              :key="item"
              class="btn-color"
              :style="{ backgroundColor: item }"
              @click="color = item"
            ></button>
          </div>
          <div class="options-for-figure">
            <button class="clear" @click="clearPicture()">Clear</button>
            <button class="save" @click="savePicture()">Save</button>
          </div>
        </div>
      </div>
    </main>
    <Modal
      v-if="stateForShowModal"
      @stateChanged="stateForShowModal = $event"
      :img="img"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { AppRoutes } from "../router";
import Modal from "../components/Modal.vue";

export default defineComponent({
  components: {
    Modal
  },
  setup() {
    const router = useRouter();
    const canvas = ref<HTMLCanvasElement | null>(null);
    const context = ref<CanvasRenderingContext2D | null>(null);
    const isDrawing = ref(false);
    const startX = ref(0);
    const startY = ref(0);
    const color = ref("rgba(0,0,0,1)");
    const allColor = ref([
      "rgba(255,0,0,1)",
      "rgba(0,255,0,1)",
      "rgba(0,0,255,1)",
      "rgba(0,0,0,1)",
      "rgba(255,255,255,1)"
    ]);
    const size = ref(1);
    const allSize = ref([1, 5, 10, 20]);
    const isSizeWindow = ref(false);
    const isColorWindow = ref(false);
    const figure = ref("pencil");
    const stateForShowModal = ref(false);
    const img = ref("");
    const image = ref();

    const backHome = () => router.push(AppRoutes.home);

    const savePicture = (): void => {
      const can = canvas.value;

      if (can) {
        img.value = can.toDataURL("image/png");
        stateForShowModal.value = true;
      }
    };

    const clearPicture = (): void => {
      const can = canvas.value;
      const con = context.value;

      if (can && con) {
        con.clearRect(0, 0, can.width, can.height);
      }
    };

    const mousedown = (e: MouseEvent): void => {
      const can = canvas.value;
      const con = context.value;
      isDrawing.value = true;
      if (can && con) {
        startX.value = e.offsetX;
        startY.value = e.offsetY;
      }
    };

    const mousemove = (e: MouseEvent): void => {
      const can = canvas.value;
      const con = context.value;
      const x = e.offsetX - e.movementX;
      const y = e.offsetY - e.movementY;

      if (can && con && isDrawing.value) {
        con.lineWidth = size.value;
        con.lineCap = "round";
        con.strokeStyle = color.value;
        if (figure.value === "pencil") {
          con.beginPath();
          con.moveTo(e.offsetX, e.offsetY);
          con.lineTo(x, y);
          con.stroke();
          con.closePath();
        }
        if (figure.value === "line") {
          con.beginPath();
          con.moveTo(startX.value, startY.value);
          con.clearRect(0, 0, can.width, can.height);
          con.lineTo(e.offsetX, e.offsetY);
          con.stroke();
          con.closePath();
        }
        if (figure.value === "rectangle") {
          con.beginPath();
          con.moveTo(startX.value, startY.value);
          con.clearRect(0, 0, can.width, can.height);
          con.rect(
            startX.value,
            startY.value,
            e.offsetX - startX.value,
            e.offsetY - startY.value
          );
          con.fillStyle = color.value;
          con.fill();
          con.stroke();
          con.closePath();
        }
        if (figure.value === "circle") {
          con.beginPath();
          con.moveTo(startX.value, startY.value);
          con.clearRect(0, 0, can.width, can.height);
          con.arc(
            startX.value,
            startY.value,
            Math.pow(
              Math.pow(x - startX.value, 2) + Math.pow(y - startY.value, 2),
              0.5
            ),
            0,
            Math.PI * 2,
            false
          );
          con.fillStyle = color.value;
          con.fill();
          con.stroke();
          con.closePath();
        }
      }
    };

    const mouseup = (): void => {
      isDrawing.value = false;
    };

    onMounted((): void => {
      const can = canvas.value;

      if (can) {
        context.value = can.getContext("2d");
        can.addEventListener("mousedown", mousedown);
        can.addEventListener("mousemove", mousemove);
        can.addEventListener("mouseup", mouseup);
      }
    });

    return {
      backHome,
      savePicture,
      clearPicture,
      canvas,
      context,
      isDrawing,
      startX,
      startY,
      color,
      allColor,
      size,
      allSize,
      isSizeWindow,
      isColorWindow,
      figure,
      stateForShowModal,
      img,
      image
    };
  }
});
</script>

<style lang="scss">
header {
  h2 {
    padding-left: 20px;
    color: #fff;
  }

  button {
    margin: 10px 20px;
    padding: 10px;
    border-radius: 2px;
    font-size: 13px;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    background-color: rgba(255, 106, 0, 1);
    &:hover {
      opacity: 0.8;
    }
  }
}

main {
  .image-size {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    @media (max-width: 762px) {
      margin-top: 0;
      flex-direction: column;
    }

    .figure {
      height: 100%;
      border: 2px solid #000;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      @media (max-width: 762px) {
        width: 325px;
        height: 50px;
        margin-left: 0;
        flex-direction: row;
      }

      button {
        padding: 5px;
        margin: 5px;
        border-radius: 2px;
        font-size: 20px;
        border: none;
        cursor: pointer;
        color: #fff;
        background-color: #3b3b3b;
        &:hover {
          opacity: 0.8;
        }
      }
    }

    canvas {
      background-color: #fff;
      @media (max-width: 762px) {
        width: 325px;
        height: 250px;
      }
    }

    .options {
      height: 100%;
      border: 2px solid #000;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-right: 10px;
      @media (max-width: 762px) {
        width: 325px;
        height: 50px;
        margin-left: 0;
        margin-right: 0;
        flex-direction: row;
      }

      .options-for-figure {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media (max-width: 762px) {
          flex-direction: row;
        }
      }

      button {
        padding: 5px;
        margin: 5px 10px;
        border-radius: 2px;
        font-size: 20px;
        border: none;
        cursor: pointer;
        color: #fff;
        background-color: #3b3b3b;
        &:hover {
          opacity: 0.8;
        }
      }

      .btn-color {
        width: 20px;
        height: 20px;
      }

      .save {
        background-color: green;
      }

      .clear {
        background-color: blue;
      }
    }
  }
}
</style>
