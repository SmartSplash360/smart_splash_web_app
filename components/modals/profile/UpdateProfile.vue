<template>
  <div
    @click="handleCloseUpdateProfileModal"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex-center bg-[#000000da]"
  >
    <div v-if="loading" class="card self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <form
      v-else
      @click.stop
      class="flex min-h-[500px] flex-col items-center gap-12 rounded-md bg-white p-10 lg:min-w-[550px] dark:bg-[#31353F]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        Update Profile Picture
      </h2>
      <img
        :src="imageSrc"
        alt="Uploaded Image"
        v-if="imageSrc"
        class="h-48 w-48 rounded-full"
      />
      <div class="my-10 flex flex-col gap-4">
        <div class="card">
          <!-- <Toast /> -->
          <FileUpload
            name="basic"
            @upload="handleUpload($event)"
            :multiple="false"
            accept="image/*"
            :maxFileSize="1000000"
          >
            <template #empty>
              <p>Drag and drop files to here to upload.</p>
            </template>
          </FileUpload>
        </div>
        <p class="min-h-[20px]">
          <span v-show="errorCover" class="text-[#D42F24] text-xs">{{
            errorCover
          }}</span>
        </p>
      </div>
      <div class="mt-10 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="handleCloseUpdateProfileModal"
          class="hover:shadow-xl"
        />
        <Button
          label="Update Profile"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="updateProfile()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/users";
import { useCustomerStore } from "~/stores/customer";

const { handleCloseUpdateProfileModal, customer, type } = defineProps([
  "handleCloseUpdateProfileModal",
  "customer",
  "type",
]);

const store = useCustomerStore();
const userStore = useUserStore();

const toast = useToast();

const selectedFile = ref(null);
const imageSrc = ref("");
const loading = ref(false);

const errorCover = ref("");

const handleUpload = (event) => {
  selectedFile.value = event.files[0];
  if (!selectedFile.value) {
    errorCover.value = "Please Select a file and upload";
    return;
  } else {
    errorCover.value = "";
    const reader = new FileReader();
    reader.onload = (e) => {
      imageSrc.value = e.target.result;
    };
    reader.readAsDataURL(selectedFile.value);
  }
};

const updateProfile = async () => {
  if (!selectedFile.value) {
    errorCover.value = "Please select a file and press upload";
    return;
  } else {
    try {
      loading.value = true;
      const formData = new FormData();
      formData.append("photo", selectedFile.value);

      if (type === "customer") {
        await store.updateCustomerProfile(customer?.id, {
          photo: selectedFile.value,
        });
        await store.fetchCustomers();
        toast.add({
          severity: "success",
          summary: "Profile Update Success",
          detail: "You have updated your profile successfully",
          life: 5000,
        });
      } else if (type === "technician") {
        await store.updateCustomerProfile(customer?.id, {
          photo: selectedFile.value,
        });
        await store.fetchCustomers();
        toast.add({
          severity: "success",
          summary: "Profile Update Success",
          detail: "You have updated your profile successfully",
          life: 5000,
        });
      }
      location.reload();
      loading.value = false;
    } catch (e) {
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "Profile Update Fail",
        detail: `Your profile was not updated, something occured`,
        life: 5000,
      });
    }
  }
};
</script>
