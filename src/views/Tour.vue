<template>
  <div class="tour">
    <Home v-if="count < 3" />
    <Image v-if="count >= 3" />
    <div
      class="modal"
      :class="{ modal_center: count === 0 || count === tour.length - 1 }"
    >
      <ModalTour
        v-if="tour[count].id"
        :tour="tour[count]"
        @changeExplanation="count += $event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Home from "./Home.vue";
import Image from "./Image.vue";
import ModalTour from "../components/ModalTour.vue";

export default defineComponent({
  components: {
    Home,
    Image,
    ModalTour
  },
  setup() {
    const count = ref(0);
    const tour = ref([
      {
        id: 1,
        caption: "Welcome to the mini-paint",
        text:
          "Please, click on the button 'Next', if you want to know all functions of this apps. If you are expert in this app, you can click button 'Skip'",
        style: {
          width: "40%",
          fontSize: "20px"
        },
        positionRectangle: {
          state: false,
          position: {}
        },
        buttons: {
          back: false,
          next: true
        }
      },
      {
        id: 2,
        caption: "These is a button 'Create file'",
        text:
          "If you want to draw a new picture, you have click on this button. After that, you will be taken to a page, where you can do it.",
        style: {
          top: "60px",
          left: "20px"
        },
        positionRectangle: {
          state: true,
          position: {
            left: "5px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 3,
        caption: "These is a button 'Sign out'",
        text: "If you want to leave our site, we will wait you next time:)",
        style: {
          top: "60px",
          right: "60px"
        },
        positionRectangle: {
          state: true,
          position: {
            left: "345px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 4,
        caption: "Name of page",
        text: "This is a name of page.",
        style: {
          top: "60px",
          left: "80px"
        },
        positionRectangle: {
          state: true,
          position: {
            left: "5px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 5,
        caption: "Back to main page",
        text: "If you want to return on home page, click this button.",
        style: {
          top: "60px",
          right: "60px"
        },
        positionRectangle: {
          state: true,
          position: {
            left: "345px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 6,
        caption: "Figures",
        text: "If you want to draw picture, you can use this buttons.",
        style: {
          position: "relative",
          top: "280px",
          right: "215px"
        },
        positionRectangle: {
          state: true,
          position: {
            left: "5px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 7,
        caption: "Settings",
        text:
          "If you want to change color or size of line, you can use this buttons.",
        style: {
          position: "relative",
          top: "190px",
          left: "160px"
        },
        positionRectangle: {
          state: true,
          position: {
            left: "345px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 8,
        caption: "Clear and Save",
        text:
          "If you want to clear a picture - click 'Clear', if you want to cave picture - click 'Save'.",
        style: {
          position: "relative",
          top: "330px",
          left: "160px"
        },
        positionRectangle: {
          state: true,
          position: {
            left: "346px",
            top: "139px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 9,
        caption: "Paper",
        text: "This is a place for drawing",
        style: {
          position: "relative",
          top: "10px"
        },
        positionRectangle: {
          state: false,
          position: {}
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 10,
        caption: "Congratulations",
        text:
          "After this tutorial, you can go to use your imagination to create many pictures.",
        style: {
          width: "40%",
          fontSize: "20px"
        },
        positionRectangle: {
          state: false,
          position: ""
        },
        buttons: {
          back: true,
          next: false
        }
      }
    ]);

    const showButtons = (num: number) => {
      count.value += num;
    };

    return {
      count,
      showButtons,
      tour
    };
  }
});
</script>

<style lang="scss" scoped>
.tour {
  position: relative;

  .modal {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .modal_center {
    align-items: center;
  }
}
</style>
