<script setup>
import {Head, useForm} from '@inertiajs/inertia-vue3';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.vue';
import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetInput from '@/Jetstream/Input.vue';
import JetCheckbox from '@/Jetstream/Checkbox.vue';
import JetLabel from '@/Jetstream/Label.vue';
import JetValidationErrors from '@/Jetstream/ValidationErrors.vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in"/>

    <JetAuthenticationCard>
        <template #logo>
            <JetAuthenticationCardLogo/>
            <h1 class="h-14 text-2xl flex items-center bg-gradient-to-r text-transparent bg-clip-text hover:bg-gradient-to-bl from-lime-600 to-amber-500">
                Mangrove
            </h1>
        </template>

        <JetValidationErrors class="mb-4"/>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <JetLabel for="email" value="Email"/>
                <JetInput
                    id="email"
                    v-model="form.email"
                    autofocus
                    class="mt-1 block w-full"
                    required
                    type="email"
                />
            </div>

            <div class="mt-4">
                <JetLabel for="password" value="Password"/>
                <JetInput
                    id="password"
                    v-model="form.password"
                    autocomplete="current-password"
                    class="mt-1 block w-full"
                    required
                    type="password"
                />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <JetCheckbox v-model:checked="form.remember" name="remember"/>
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <!--                <Link v-if="canResetPassword" :href="route('password.request')" class="underline text-sm text-gray-600 hover:text-gray-900">-->
                <!--                    Forgot your password?-->
                <!--                </Link>-->

                <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing" class="ml-4">
                    Log in
                </JetButton>
            </div>
        </form>
        <div class="flex items-center justify-center mt-4">
            <a href="register">
                <span class="underline text-sm text-gray-600 hover:text-gray-900">Don't have an account?</span>
            </a>
        </div>
    </JetAuthenticationCard>
</template>
