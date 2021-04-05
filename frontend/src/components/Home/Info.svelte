<script lang="ts">
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
	import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
</script>

<div class="flex flex-wrap items-center justify-center max-w-full sm:max-w-md w-96 sm:w-max p-2 sm:p-4">
	<p class="text-center w-full mb-3">
		Tabooo is a cybernetically enhanced taboo game built with Svelte, as catchphrase can suggest. The goal is simple - describe a word to
		your team without using given words and let them guess it. Better team wins, good luck and have fun!
	</p>
	<a
		href="https://github.com/pawelblaszczyk5"
		class="block w-8 h-8 transform hover:scale-125 transition-transform duration-500 mx-2"
		target="_blank">
		<FaGithub />
	</a>
	<a
		href="https://www.linkedin.com/in/pawel-blaszczyk/"
		class="block w-8 h-8 transform hover:scale-125 transition-transform duration-500 mx-2"
		target="_blank">
		<FaLinkedin />
	</a>
</div>
