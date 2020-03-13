import { AuthInterceptor } from './auth.interceptor';
import { DemoInterceptor } from './demo.interceptor';

export const interceptors = { AuthInterceptor, DemoInterceptor };

export * from './auth.interceptor';
export * from './demo.interceptor';
