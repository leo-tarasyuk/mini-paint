<template>
  <header>
    <h2>Settings</h2>
    <button @click="backHome()">←</button>
  </header>
  <main>
    <form @submit.prevent="sendUserInformation" @keyup="checkEditInformation">
      <fieldset>
        <legend>General information</legend>
        <div class="form-group">
          <label>
            <p>Surname</p>
          </label>
          <div class="component-form">
            <input
              type="text"
              v-model="user.surname"
              @blur="v$.surname.$touch"
              :class="{ invalid: v$.surname.$error }"
            />
            <div
              class="component-error"
              v-for="(error, index) of v$.surname.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>
            <p>Name</p>
          </label>
          <div class="component-form">
            <input
              type="text"
              v-model="user.name"
              @blur="v$.name.$touch"
              :class="{ invalid: v$.name.$error }"
            />
            <div
              class="component-error"
              v-for="(error, index) of v$.name.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>
            <p>Birthday</p>
          </label>
          <div class="component-form">
            <input
              type="date"
              v-model="user.birthday"
              @blur="v$.birthday.$touch"
              :class="{ invalid: v$.birthday.$error }"
            />
            <div
              class="component-error"
              v-for="(error, index) of v$.birthday.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="component-form radio">
            <p>Male</p>
            <input
              type="radio"
              id="male"
              v-model="user.gender"
              value="Male"
              checked
            />
            <label for="male"></label>
            <p>Female</p>
            <input
              type="radio"
              id="female"
              v-model="user.gender"
              value="Female"
            />
            <label for="female"></label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Contact information</legend>
        <div class="form-group">
          <label>
            <p>Telephone</p>
          </label>
          <div class="component-form">
            <input
              type="text"
              v-model.number="user.telephone"
              @blur="v$.telephone.$touch"
              :class="{ invalid: v$.telephone.$error }"
            />
            <div
              class="component-error"
              v-for="(error, index) of v$.telephone.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>
            <p>City</p>
          </label>
          <div class="component-form">
            <input
              type="text"
              v-model="user.city"
              @blur="v$.city.$touch"
              :class="{ invalid: v$.city.$error }"
            />
            <div
              class="component-error"
              v-for="(error, index) of v$.city.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>
            <p>Email</p>
          </label>
          <div class="component-form">
            <p class="email">{{ email }}</p>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Additional information</legend>
        <div class="form-group">
          <label>
            <p>Family status</p>
          </label>
          <div class="component-form">
            <select
              v-model="user.status"
              @blur="v$.status.$touch"
              :class="{ invalid: v$.status.$error }"
            >
              <option selected value="single">single</option>
              <option value="in a relationship">in a relationship</option>
              <option value="betrothed">betrothed</option>
              <option value="married">married</option>
            </select>
            <div
              class="component-error"
              v-for="(error, index) of v$.status.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>
            <p>Job status</p>
          </label>
          <div class="component-form">
            <select
              v-model="user.job.status"
              @blur="v$.job.status.$touch"
              :class="{ invalid: v$.job.status.$error }"
            >
              <option selected value="working">working</option>
              <option value="don't working">don't working</option>
              <option value="decree">decree</option>
            </select>
            <div
              class="component-error"
              v-for="(error, index) of v$.job.status.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div v-if="user.job.status === 'working'" class="form-group">
          <label>
            <p>Organization</p>
          </label>
          <div class="component-form">
            <input type="text" v-model="user.job.organization" />
          </div>
        </div>
        <div v-if="user.job.status === 'working'" class="form-group">
          <label>
            <p>Position</p>
          </label>
          <div class="component-form">
            <input type="text" v-model="user.job.position" />
          </div>
        </div>
        <p>Biography</p>
        <div class="form-group">
          <textarea v-model="user.biography"></textarea>
        </div>
        <div class="form-group">
          <label>
            <p>Photo</p>
          </label>
          <div class="component-form">
            <label for="photo" class="choose-photo">Choose photo</label>
            <input
              type="file"
              id="photo"
              ref="photo"
              @change="onFileSelected"
            />
            <img v-if="user.image" :src="user.image" />
            <div
              class="component-error error-download-file"
              v-for="(error, index) of v$.image.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
      </fieldset>
      <div class="modal-buttons">
        <div></div>
        <input
          :disabled="statusEditPropertyUser"
          :class="{ disable_button: statusEditPropertyUser }"
          type="submit"
          value="Send"
        />
      </div>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import useVuelidate from "@vuelidate/core";
import {
  required,
  alpha,
  numeric,
  minLength,
  helpers
} from "@vuelidate/validators";

import { useStore } from "../store";
import { AppRoutes } from "../router";

export default defineComponent({
  setup() {
    const { dispatch, getters } = useStore();
    const router = useRouter();
    const photo = ref<HTMLInputElement | null>(null);
    const image = ref<string | ArrayBuffer | null>(null);
    const email = ref(localStorage.getItem("email"));
    const user = ref({
      biography: "",
      birthday: "",
      city: "",
      email: email.value,
      gender: "Male",
      id: localStorage.getItem("user"),
      image,
      job: {
        status: "",
        organization: "",
        position: ""
      },
      name: "",
      status: "",
      surname: "",
      telephone: ""
    });
    const checkValidTelephone = (value: any) => {
      const validator = /^(375|80)(29|25|44|33)([0-9]{3})([0-9]{2})([0-9]{2})$/;
      return validator.test(value);
    };
    const rules = {
      surname: { required, alpha },
      name: { required, alpha, minLength: minLength(2) },
      birthday: { required },
      gender: { required },
      telephone: {
        required,
        numeric,
        validTelephone: helpers.withMessage(
          () => "Please, write correct phone number",
          checkValidTelephone
        )
        // valid: helpers.withMessage(
        //   () => "Please, write correct phone number",
        //   helpers.regex(/^(375|80)(29|25|44|33)([0-9]{3})([0-9]{2})([0-9]{2})$/)
        // )
      },
      city: { required, alpha },
      status: { required },
      job: {
        status: { required }
      },
      image: { required }
    };
    const v$ = useVuelidate(rules, user.value);
    const stateLeaveSettings = ref(false);
    const currentUser = computed(() => getters["pictures/getUserProperty"]);
    const statusEditPropertyUser = ref(true);

    onMounted(async () => {
      await dispatch("pictures/getUserParams");
      if (currentUser.value !== null) {
        user.value = Object.assign(user.value, currentUser.value);
      }
    });

    const backHome = () => router.push(AppRoutes.home);

    const checkEditInformation = () => {
      statusEditPropertyUser.value =
        JSON.stringify(user.value) === JSON.stringify(currentUser.value);
    };

    const sendUserInformation = () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
      } else {
        stateLeaveSettings.value = true;
        dispatch("pictures/setUserParams", user.value);
        router.push(AppRoutes.home);
      }
    };

    const onFileSelected = () => {
      const pht = photo.value;
      const reader = new FileReader();

      if (pht) {
        const file = pht.files;

        if (file) {
          const selectedFile = file[0];

          reader.readAsDataURL(selectedFile);
          reader.onload = function() {
            image.value = reader.result;
          };
        }
      }
    };

    onBeforeRouteLeave((to, fromR, next) => {
      if (stateLeaveSettings.value) {
        next();
        return;
      }
      if (
        window.confirm("Do you really want to leave? You have unsaved changes!")
      ) {
        next();
      } else {
        next(false);
      }
    });

    return {
      v$,
      photo,
      image,
      email,
      user,
      currentUser,
      statusEditPropertyUser,
      stateLeaveSettings,
      backHome,
      checkEditInformation,
      sendUserInformation,
      onFileSelected,
      checkValidTelephone
    };
  }
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000;

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
  margin: 0 auto;

  form {
    width: 400px;
    margin: 0 auto;
    padding: 20px 0;
    color: #bebebe;

    fieldset {
      border-radius: 5px;
      margin-bottom: 20px;

      legend {
        margin-left: 10px;
        font-size: 20px;
      }

      .form-group {
        width: 100%;
        padding: 10px 0 5px 0;
        display: flex;

        label {
          width: 30%;
          padding-left: 10px;

          p {
            padding: 5px 0;
          }
        }

        .component-form {
          width: 60%;
          min-height: 30px;

          input {
            width: 100%;
            padding-left: 5px;
            box-sizing: border-box;
            outline: none;
            background: #bebebe;
            border: 1px solid #2f3234;
            border-radius: 2px;
            font-size: 20px;
          }

          .email {
            width: 100%;
            padding: 5px 0;
          }

          .invalid {
            border: 1px solid red;
          }

          .component-error {
            padding: 5px 0 0 5px;
            color: red;
          }

          .error-download-file {
            padding: 20px 0 0 50px;
          }

          select {
            width: 100%;
            background: #bebebe;
            font-size: 18px;

            option {
              background: #bebebe;
            }
          }

          input[type="file"] {
            display: none;
          }

          img {
            width: 100%;
            margin-top: 20px;
          }

          .choose-photo {
            height: auto;
            margin: 0 10px 0 60px;
            padding: 10px;
            text-align: center;
            border-radius: 2px;
            font-size: 13px;
            outline: none;
            border: none;
            cursor: pointer;
            color: #fff;
            font-weight: 700;
            background-color: rgba(255, 106, 0, 1);
          }
        }

        .radio {
          width: 65%;
          min-height: 10px;
          display: flex;

          input[type="radio"] {
            display: none;
            &:checked + label::before {
              opacity: 1;
            }
          }

          label {
            display: block;
            width: 8px;
            border-radius: 50%;
            background-color: #bebebe;
            position: relative;
            margin-left: 5px;
            cursor: pointer;
            &::before {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              display: block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #2f3234;
              opacity: 0;
              transition: 0.2s;
            }
          }

          p {
            height: auto;
            padding: 0 0 0 10px;
          }
        }

        textarea {
          width: 375px;
          max-width: 375px;
          min-width: 375px;
          min-height: 100px;
          margin-left: 10px;
          font-size: 20px;
          background: #bebebe;
        }
      }

      p {
        padding: 10px 0 0 10px;
      }
    }

    .modal-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        margin: 0px 10px;
        padding: 10px 20px;
        border-radius: 2px;
        font-size: 13px;
        outline: none;
        border: none;
        cursor: pointer;
        color: #fff;
        font-weight: 700;
      }

      input[type="reset"] {
        background-color: #0180da;
      }

      input[type="submit"] {
        background-color: rgba(255, 106, 0, 1);
      }

      .disable_button {
        opacity: 0.5;
      }
    }
  }
}
</style>
