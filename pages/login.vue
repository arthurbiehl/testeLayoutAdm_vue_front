<template>
  <div class="min-h-screen flex bg-zinc-50">
    <!-- Left Side - Image Carousel -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <!-- Carousel Container -->
      <div class="relative w-full h-full">
        <TransitionGroup name="fade">
          <div
            v-for="(slide, index) in carouselSlides"
            :key="index"
            v-show="currentSlide === index"
            class="absolute inset-0"
          >
            <div
              class="w-full h-full bg-cover bg-center"
              :style="{ backgroundImage: `url(${slide.image})` }"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
            
            <!-- Content Overlay -->
            <div class="absolute inset-0 flex flex-col justify-between p-12">
              <!-- Logo/Brand -->
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span class="text-2xl font-bold text-slate-900">E</span>
                </div>
                <span class="text-white text-2xl font-semibold tracking-tight">Estoque</span>
              </div>

              <!-- Slide Content -->
              <div class="space-y-6 max-w-xl">
                <h2 class="text-4xl font-bold text-white leading-tight">
                  {{ slide.title }}
                </h2>
                <p class="text-lg text-white/90 leading-relaxed">
                  {{ slide.description }}
                </p>

                <!-- Carousel Indicators -->
                <div class="flex space-x-2 pt-4">
                  <button
                    v-for="(_, index) in carouselSlides"
                    :key="index"
                    @click="goToSlide(index)"
                    :class="[
                      'h-1 rounded-full transition-all duration-300',
                      currentSlide === index ? 'w-12 bg-white' : 'w-8 bg-white/40 hover:bg-white/60'
                    ]"
                    :aria-label="`Go to slide ${index + 1}`"
                  />
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <FormsLogin />

    <!-- Right Side - Login Form -->
    

    <Toaster position="bottom-center" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Toaster } from 'vue-sonner'
import { useAuth } from '~/store/auth.store'

const colorMode = useColorMode()
colorMode.preference = 'light'

useHead({
  title: 'Login - Estoque'
})

const store = useAuth()
const { authenticateUser } = store


// Carousel functionality
const currentSlide = ref(0)
let carouselInterval: NodeJS.Timeout | null = null

const carouselSlides = [
  {
    image: '/placeholder.svg?height=1080&width=1920',
    title: 'Gestão inteligente de estoque',
    description: 'Controle total sobre seus produtos com relatórios em tempo real e análises avançadas.'
  },
  {
    image: '/placeholder.svg?height=1080&width=1920',
    title: 'Análises que impulsionam resultados',
    description: 'Tome decisões baseadas em dados com nossos dashboards intuitivos e personalizáveis.'
  },
  {
    image: '/placeholder.svg?height=1080&width=1920',
    title: 'Colaboração sem fronteiras',
    description: 'Mantenha sua equipe sincronizada com ferramentas de colaboração em tempo real.'
  }
]

function goToSlide(index: number) {
  currentSlide.value = index
  resetCarouselInterval()
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

function startCarouselInterval() {
  carouselInterval = setInterval(nextSlide, 5000)
}

function resetCarouselInterval() {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
  startCarouselInterval()
}

onMounted(() => {
  startCarouselInterval()
})

onUnmounted(() => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>