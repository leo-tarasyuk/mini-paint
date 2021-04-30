<template>
  <div class="tour">
    <Home v-if="tour[count].window === 'Home'" />
    <Image v-if="tour[count].window === 'Image'" />
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
        window: "Home",
        style: {
          width: "550px",
          fontSize: "20px"
        },
        tourButton: {
          name: []
        },
        positionRectangle: {
          state: false,
          position: {}
        },
        modalWindow: {
          style: {}
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
          "If you want to draw a new picture, you have to click on this button. After that, you will be taken to a page, where you can do it.",
        window: "Home",
        style: {
          top: "70px",
          left: "15px"
        },
        tourButton: {
          name: ["Create file"],
          style: {
            margin: 0,
            backgroundColor: "#0180da"
          }
        },
        positionRectangle: {
          state: true,
          position: {
            top: "42px",
            left: "4px"
          }
        },
        modalWindow: {
          style: {
            position: "absolute",
            top: "51px"
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
        window: "Home",
        style: {
          top: "10px",
          right: "15px"
        },
        tourButton: {
          name: ["Sign out"],
          style: {
            margin: 0,
            backgroundColor: "rgba(255, 106, 0, 1)"
          },
          position: {
            right: 0
          }
        },
        positionRectangle: {
          state: true,
          position: {
            top: "42px",
            left: "326px"
          }
        },
        modalWindow: {
          style: {
            position: "absolute",
            top: "51px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 4,
        caption: "Back to main page",
        text: "If you want to return on home page, click this button.",
        window: "Image",
        style: {
          top: "10px",
          right: "20px"
        },
        tourButton: {
          name: ["←"],
          style: {
            margin: 0,
            backgroundColor: "rgba(255, 106, 0, 1)"
          },
          position: {
            right: "-5px"
          }
        },
        positionRectangle: {
          state: true,
          position: {
            top: "42px",
            left: "326px"
          }
        },
        modalWindow: {
          style: {
            position: "absolute",
            top: "51px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 5,
        caption: "Figures",
        text: "If you want to draw picture, you can use this buttons.",
        window: "Image",
        style: {
          position: "relative",
          top: "270px",
          right: "212px"
        },
        tourButton: {
          name: ["∼", "/", "▭", "◯"],
          style: {
            margin: "5px"
          },
          position: {
            backgroundColor: "unset",
            top: "-202px",
            right: "311px"
          }
        },
        positionRectangle: {
          state: true,
          position: {
            left: "5px"
          }
        },
        modalWindow: {
          style: {
            position: "absolute",
            top: "11px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 6,
        caption: "Settings",
        text:
          "If you want to change color or size of line, you can use this buttons.",
        window: "Image",
        style: {
          position: "relative",
          top: "179px",
          left: "191px"
        },
        tourButton: {
          name: ["Color", "Size"],
          position: {
            backgroundColor: "unset",
            top: "-111px",
            left: "290px"
          }
        },
        positionRectangle: {
          state: true,
          position: {
            left: "325px"
          }
        },
        modalWindow: {
          style: {
            position: "absolute",
            top: "11px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 7,
        caption: "Clear and Save",
        text:
          "If you want to clear a picture - click 'Clear', if you want to cave picture - click 'Save'.",
        window: "Image",
        style: {
          position: "relative",
          top: "280px",
          left: "190px"
        },
        tourButton: {
          name: ["Clear", "Save"],
          position: {
            backgroundColor: "unset",
            top: "171px",
            left: "290px"
          }
        },
        positionRectangle: {
          state: true,
          position: {
            left: "325px",
            top: "153px"
          }
        },
        modalWindow: {
          style: {
            position: "absolute",
            top: "11px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 8,
        caption: "Paper",
        text: "This is a place for drawing",
        window: "Image",
        style: {
          position: "relative",
          top: "10px"
        },
        tourButton: {
          name: []
        },
        positionRectangle: {
          state: false,
          position: {}
        },
        modalWindow: {
          style: {
            position: "absolute",
            top: "11px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 9,
        caption: "These is a button 'Slider'",
        text:
          "If you want to see all pictures in slider, you have to click on this button. After that, you will be taken to this page",
        window: "Home",
        style: {
          top: "70px",
          left: "138px"
        },
        tourButton: {
          name: ["Slider"],
          style: {
            margin: 0,
            backgroundColor: "#0180da"
          }
        },
        positionRectangle: {
          state: true,
          position: {
            top: "42px",
            left: "4px"
          }
        },
        modalWindow: {
          style: {
            position: "absolute",
            top: "51px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 10,
        caption: "These is a button 'Settings'",
        text:
          "If you want to write or change your personal data, you have to click on this button. After that, you will be taken to this page",
        window: "Home",
        style: {
          top: "10px",
          left: "15px"
        },
        tourButton: {
          name: ["Settings"],
          style: {
            margin: 0,
            backgroundColor: "rgba(255, 106, 0, 1)"
          }
        },
        positionRectangle: {
          state: true,
          position: {
            top: "42px",
            left: "4px"
          }
        },
        modalWindow: {
          style: {
            position: "absolute",
            top: "51px"
          }
        },
        buttons: {
          back: true,
          next: true
        }
      },
      {
        id: 11,
        caption: "Congratulations",
        text:
          "After this tutorial, you can go to use your imagination to create many pictures.",
        window: "Home",
        style: {
          width: "550px",
          fontSize: "20px"
        },
        tourButton: {
          name: []
        },
        positionRectangle: {
          state: false,
          position: {}
        },
        modalWindow: {
          style: {}
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
