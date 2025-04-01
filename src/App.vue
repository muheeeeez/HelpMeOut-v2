<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Sora:wght@100..800&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

:root {
  --primary-color: #100A42;
  --primary-light: #1E1A65;
  --secondary-color: #BAF6EB;
  --secondary-light: #E7FBF8;
  --accent-color: #413C6D;
  --text-primary: #141414;
  --text-secondary: #616163;
  --text-tertiary: #858585;
  --white: #FFFFFF;
  --light-bg: #FAFAFA;
  --error: #F44336;
  --success: #4CAF50;
  --warning: #FFC107;
  --info: #2196F3;
  --transition-speed: 0.3s;
  --border-radius: 8px;
  --border-radius-lg: 12px;
  --border-radius-sm: 4px;
  --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  --box-shadow-hover: 0 15px 35px rgba(16, 10, 66, 0.18);
  --max-width: 1200px;
}

body {
  font-family: 'Work Sans', sans-serif;
  color: var(--text-primary);
  background-color: var(--white);
  line-height: 1.6;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

h1 {
  font-size: 3.5rem;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 2rem;
}

h4 {
  font-size: 1.5rem;
}

h5 {
  font-size: 1.25rem;
}

h6 {
  font-size: 1rem;
}

p {
  margin-bottom: 1rem;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: all var(--transition-speed) ease;
}

a:hover {
  color: var(--accent-color);
}

img {
  max-width: 100%;
  height: auto;
}

button {
  cursor: pointer;
  font-family: 'Work Sans', sans-serif;
  transition: all 0.3s ease;
}

button:focus, a:focus {
  outline: 2px solid rgba(16, 10, 66, 0.3);
}

/* Animation classes */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: all var(--transition-speed) ease;
  border: none;
  gap: 8px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--white);
}

.btn-primary:hover {
  background-color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(16, 10, 66, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.btn-secondary:hover {
  background-color: rgba(16, 10, 66, 0.05);
  transform: translateY(-3px);
}

.btn-accent {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.btn-accent:hover {
  background-color: var(--secondary-light);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(186, 246, 235, 0.4);
}

.btn-lg {
  padding: 16px 32px;
  font-size: 1.1rem;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.9rem;
}

/* Layout classes */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: 80px 0;
  position: relative;
}

.section-sm {
  padding: 40px 0;
}

.section-lg {
  padding: 120px 0;
}

.card {
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 24px;
  transition: all var(--transition-speed) ease;
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow-hover);
}

/* Animation for page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--light-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

/* Utility classes */
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-primary {
  color: var(--primary-color);
}

.text-secondary {
  color: var(--text-secondary);
}

.text-accent {
  color: var(--accent-color);
}

.bg-primary {
  background-color: var(--primary-color);
  color: var(--white);
}

.bg-secondary {
  background-color: var(--secondary-color);
}

.bg-light {
  background-color: var(--light-bg);
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-end {
  justify-content: flex-end;
}

.align-center {
  align-items: center;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}

.gap-5 {
  gap: 5px;
}

.gap-10 {
  gap: 10px;
}

.gap-20 {
  gap: 20px;
}

.gap-30 {
  gap: 30px;
}

.mb-5 {
  margin-bottom: 5px;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-20 {
  margin-bottom: 20px;
}

.mb-30 {
  margin-bottom: 30px;
}

.mb-40 {
  margin-bottom: 40px;
}

.mt-5 {
  margin-top: 5px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-20 {
  margin-top: 20px;
}

.mt-30 {
  margin-top: 30px;
}

.mt-40 {
  margin-top: 40px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.w-100 {
  width: 100%;
}

.w-50 {
  width: 50%;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.overflow-hidden {
  overflow: hidden;
}

.rounded {
  border-radius: var(--border-radius);
}

.rounded-lg {
  border-radius: var(--border-radius-lg);
}

.shadow {
  box-shadow: var(--box-shadow);
}

.shadow-hover:hover {
  box-shadow: var(--box-shadow-hover);
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  h3 {
    font-size: 1.75rem;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .section {
    padding: 60px 0;
  }
  
  .section-lg {
    padding: 80px 0;
  }
}
</style>
