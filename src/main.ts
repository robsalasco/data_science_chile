import 'nes.css/css/nes.min.css';
import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
	target: document.body,
});

export default app;
