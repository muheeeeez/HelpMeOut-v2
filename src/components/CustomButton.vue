<template>
  <button 
    :class="[
      'custom-button', 
      variant,
      size,
      { 'with-icon': slots.icon },
      { 'loading': loading }
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="$emit('click')"
  >
    <span class="button-content">
      <span v-if="loading" class="loader"></span>
      <slot v-else name="icon"></slot>
      <span class="button-text"><slot></slot></span>
    </span>
    <span class="button-animation"></span>
    <span class="button-background"></span>
  </button>
</template>

<script setup>
import { useSlots } from 'vue'

const slots = useSlots()

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'accent', 'outline', 'text', 'success', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.custom-button {
  position: relative;
  border: none;
  border-radius: var(--border-radius);
  font-family: 'Work Sans', sans-serif;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  outline: none;
}

.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s ease;
}

.button-animation {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
  z-index: 1;
}

.button-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(0);
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.custom-button:hover .button-animation {
  left: 100%;
}

.custom-button:hover .button-content {
  transform: translateY(-2px);
}

.custom-button:active .button-content {
  transform: translateY(1px);
}

.custom-button:focus .button-background {
  transform: scale(3);
}

.custom-button:active {
  transform: scale(0.98);
}

/* Loader */
.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading {
  cursor: wait;
  opacity: 0.8;
}

.loading .button-text {
  opacity: 0.7;
}

/* Variants */
.primary {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 10, 66, 0.2);
}

.primary:hover:not(:disabled) {
  background-color: var(--primary-light);
  box-shadow: 0 6px 15px rgba(16, 10, 66, 0.3);
  transform: translateY(-3px);
}

.secondary {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(186, 246, 235, 0.2);
}

.secondary:hover:not(:disabled) {
  background-color: var(--secondary-light);
  box-shadow: 0 6px 15px rgba(186, 246, 235, 0.3);
  transform: translateY(-3px);
}

.accent {
  background-color: var(--accent-color);
  color: white;
  box-shadow: 0 4px 12px rgba(65, 60, 109, 0.2);
}

.accent:hover:not(:disabled) {
  background-color: #534d8a;
  box-shadow: 0 6px 15px rgba(65, 60, 109, 0.3);
  transform: translateY(-3px);
}

.outline {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  box-shadow: none;
}

.outline:hover:not(:disabled) {
  background-color: rgba(16, 10, 66, 0.05);
  transform: translateY(-3px);
}

.text {
  background-color: transparent;
  color: var(--primary-color);
  box-shadow: none;
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.text:hover:not(:disabled) {
  background-color: rgba(16, 10, 66, 0.05);
  transform: translateY(-3px);
}

.text .button-animation {
  display: none;
}

.success {
  background-color: var(--success);
  color: white;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
}

.success:hover:not(:disabled) {
  background-color: #43a047;
  box-shadow: 0 6px 15px rgba(76, 175, 80, 0.3);
  transform: translateY(-3px);
}

.danger {
  background-color: var(--error);
  color: white;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
}

.danger:hover:not(:disabled) {
  background-color: #e53935;
  box-shadow: 0 6px 15px rgba(244, 67, 54, 0.3);
  transform: translateY(-3px);
}

/* Sizes */
.small {
  padding: 8px 16px;
  font-size: 14px;
  height: 36px;
}

.medium {
  padding: 12px 24px;
  font-size: 16px;
  height: 44px;
}

.large {
  padding: 16px 32px;
  font-size: 18px;
  height: 54px;
}

.with-icon {
  padding-left: 20px;
}

/* Disabled state */
.custom-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none !important;
  box-shadow: none !important;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .large {
    padding: 14px 28px;
    font-size: 16px;
    height: 50px;
  }
  
  .medium {
    padding: 10px 20px;
    font-size: 15px;
    height: 40px;
  }
  
  .small {
    padding: 6px 14px;
    font-size: 13px;
    height: 32px;
  }
}
</style> 