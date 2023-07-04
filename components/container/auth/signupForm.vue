<template>
  <form class="form-container">
    <div class="h-[125px] w-[300px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <base-input
      :placeHolder="'Full name'"
      :type="'text'"
      :name="'fullname'"
      :id="'fullname'"
    ></base-input>
    <base-input
      :placeHolder="'Email Address'"
      :type="'email'"
      :name="'email'"
      :id="'email'"
    ></base-input>
    <base-input
      :placeHolder="'Password'"
      :type="'password'"
      :name="'password'"
      :id="'password_id'"
    ></base-input>
    <base-input
      :placeHolder="'Confirm Password'"
      :type="'password'"
      :name="'confirm_password'"
      :id="'confirm_password_id'"
    ></base-input>
    <base-button :btnText="'Create Acccount'" :link="''"></base-button>
    <div class="py-3">
      <p>
        Already have an account ?
        <nuxt-link to="/signin" class="text-[#4D6977]">Sign In</nuxt-link>
      </p>
    </div>
    <div class="flex flex-col gap-3">
      <button
        class="h-[40px] w-[350px] rounded-md bg-[#3B5998] text-sm font-[400]  text-white"
      >
        <span>
          <font-awesome-icon icon="fa-brands fa-facebook" />
        </span>
        <span>Continue with Faceboook</span>
      </button>
      <button
        class="h-[40px] w-[350px] rounded-md border bg-[#FFF] text-sm font-[400]  text-black"
      >
        <span>Continue with Google</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
</script>

<style lang="scss" scoped></style>
