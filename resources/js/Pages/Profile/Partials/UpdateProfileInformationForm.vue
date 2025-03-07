<script setup>
import {ref} from 'vue';
import {Inertia} from '@inertiajs/inertia';
import {useForm} from '@inertiajs/inertia-vue3';
import JetButton from '@/Jetstream/Button.vue';
import JetFormSection from '@/Jetstream/FormSection.vue';
import JetInput from '@/Jetstream/Input.vue';
import JetInputError from '@/Jetstream/InputError.vue';
import JetLabel from '@/Jetstream/Label.vue';
import JetActionMessage from '@/Jetstream/ActionMessage.vue';
import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue';

const props = defineProps({
    user: Object,
});

const form = useForm({
    _method: 'PUT',
    name: props.user.name,
    email: props.user.email,
    photo: null,
});

const photoPreview = ref(null);
const photoInput = ref(null);

const updateProfileInformation = () => {
    if (photoInput.value) {
        form.photo = photoInput.value.files[0];
    }

    form.post(route('user-profile-information.update'), {
        errorBag: 'updateProfileInformation',
        preserveScroll: true,
        onSuccess: () => clearPhotoFileInput(),
    });
};

const selectNewPhoto = () => {
    photoInput.value.click();
};

const updatePhotoPreview = () => {
    const photo = photoInput.value.files[0];

    if (!photo) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        photoPreview.value = e.target.result;
    };

    reader.readAsDataURL(photo);
};

const deletePhoto = () => {
    Inertia.delete(route('current-user-photo.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
            photoPreview.value = null;
            clearPhotoFileInput();
        },
    });
};

const clearPhotoFileInput = () => {
    if (photoInput.value?.value) {
        photoInput.value.value = null;
    }
};
</script>

<template>
    <JetFormSection @submitted="updateProfileInformation">
        <template #title>
            <div class="dark:text-white">
                Profile Information
            </div>
        </template>

        <template #description>
            <div class="dark:text-white">
                Update your account's profile information and email address.
            </div>
        </template>

        <template #form>
            <!-- Profile Photo -->
            <div v-if="$page.props.jetstream.managesProfilePhotos" class="col-span-6 sm:col-span-4">
                <!-- Profile Photo File Input -->
                <input
                    ref="photoInput"
                    class="hidden"
                    type="file"
                    @change="updatePhotoPreview"
                >

                <JetLabel for="photo" value="Photo"/>

                <!-- Current Profile Photo -->
                <div v-show="! photoPreview" class="mt-2">
                    <img :alt="user.name" :src="user.profile_photo_url" class="rounded-full h-20 w-20 object-cover">
                </div>

                <!-- New Profile Photo Preview -->
                <div v-show="photoPreview" class="mt-2">
                    <span
                        :style="'background-image: url(\'' + photoPreview + '\');'"
                        class="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center"
                    />
                </div>

                <JetSecondaryButton class="mt-2 mr-2" type="button" @click.prevent="selectNewPhoto">
                    Select A New Photo
                </JetSecondaryButton>

                <JetSecondaryButton
                    v-if="user.profile_photo_path"
                    class="mt-2"
                    type="button"
                    @click.prevent="deletePhoto"
                >
                    Remove Photo
                </JetSecondaryButton>

                <JetInputError :message="form.errors.photo" class="mt-2"/>
            </div>

            <!-- Name -->
            <div class="col-span-6 sm:col-span-4">
                <JetLabel for="name" value="Name"/>
                <JetInput
                    id="name"
                    v-model="form.name"
                    autocomplete="name"
                    class="mt-1 block w-full"
                    type="text"
                />
                <JetInputError :message="form.errors.name" class="mt-2"/>
            </div>

            <!-- Email -->
            <div class="col-span-6 sm:col-span-4">
                <JetLabel for="email" value="Email"/>
                <JetInput
                    id="email"
                    v-model="form.email"
                    class="mt-1 block w-full"
                    type="email"
                />
                <JetInputError :message="form.errors.email" class="mt-2"/>
            </div>
        </template>

        <template #actions>
            <JetActionMessage :on="form.recentlySuccessful" class="mr-3">
                Saved.
            </JetActionMessage>

            <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save
            </JetButton>
        </template>
    </JetFormSection>
</template>
