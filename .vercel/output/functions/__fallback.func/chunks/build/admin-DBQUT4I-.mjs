import { d as defineNuxtRouteMiddleware, n as navigateTo } from '../virtual/entry.mjs';
import { u as useAuth } from './useAuth-6aHALU6L.mjs';
import 'nostics';
import 'nostics/formatters/ansi';
import 'vue';
import '../_/nitro.mjs';
import '@adonisjs/hash';
import '@adonisjs/hash/drivers/scrypt';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'node:events';
import 'ioredis';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';
import 'unhead/utils';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'vue/server-renderer';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import 'tailwindcss/colors';

//#region app/middleware/admin.ts
var admin_default = defineNuxtRouteMiddleware((_to, _from) => {
	const { isAuthenticated, user } = useAuth();
	if (!isAuthenticated.value) return navigateTo("/login");
	if (user.value?.role !== "admin") return navigateTo("/dashboard");
});

export { admin_default as default };
//# sourceMappingURL=admin-DBQUT4I-.mjs.map
