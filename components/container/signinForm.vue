<template>
  <form class="form-container">
    <div class="h-[125px] w-[300px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="flex w-full flex-col gap-3 text-start">
      <h2 class="text-[30px] font-[400] leading-[45px]">Login</h2>
      <p>Please enter your details</p>
    </div>
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
    <p class="w-full text-end text-[#4D6977]">Forgot password?</p>
    <base-button :btnText="'Login'"></base-button>
    <div class="py-3">
      <p>
        Don't have an account ?
        <nuxt-link to="/signup" class="text-[#4D6977]">Sign up</nuxt-link>
      </p>
    </div>
    <div class="flex flex-col gap-3">
      <button
        class="h-[40px] w-[350px] rounded-md border bg-[#FFF] text-sm font-[400] leading-[21px] text-black"
      >
        <span>Continue with Google</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import SmartPlashLogo from "../../assets/images/SmartSplash.png";
</script>

<style lang="scss" scoped></style>
