<script setup lang="ts">
const isDark = useDark({
  storageKey: 'icones-schema'
})
const isAppearanceTransition = typeof document !== 'undefined'
  // @ts-expect-error: Transition API
  && document.startViewTransition
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function toggleDark(event?: MouseEvent) {
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value
          ? [...clipPath].reverse()
          : clipPath
      },
      {
        duration: 400,
        easing: 'ease-in',
        fill: 'forwards',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <ClientOnly>
    <UButton
      :aria-label="`Switch to ${isDark ? 'dark' : 'light'} mode`"
      :icon="`i-lucide-${isDark ? 'moon' : 'sun'}`"
      color="neutral"
      variant="ghost"
      class="rounded-full"
      @click="toggleDark"
    />
    <template #fallback>
      <UButton
        loading
        variant="ghost"
        color="neutral"
      />
    </template>
  </ClientOnly>
</template>

<style>
/* Color Mode transition */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 2147483646;
}
.dark::view-transition-old(root) {
  z-index: 2147483646;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
