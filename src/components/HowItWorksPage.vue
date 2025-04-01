<template>
  <div class="how-it-works-section" id="how-it-works">
    <div class="section-heading">
      <h1>How it works</h1>
    </div>
    <div class="steps-container">
      <div class="step-card" data-aos="fade-up" data-aos-delay="100">
        <div class="step-content">
          <div class="step-number"><span>1</span></div>
          <h2>Record Screen</h2>
          <p>
            Click the "Start Recording" button in our extension. choose which
            part of your screen to capture and who you want to send it to.
          </p>
        </div>
        <div class="step-image">
          <img src="../assets/images/recording.jpg" alt="Recording screen" />
        </div>
      </div>
      <div class="step-card" data-aos="fade-up" data-aos-delay="200">
        <div class="step-content">
          <div class="step-number"><span>2</span></div>
          <h2>Share Your Recording</h2>
          <p>
            We generate a shareable link for your video. Simply send it to your
            audience via email or copy the link to send via any platform.
          </p>
        </div>
        <div class="step-image">
          <img src="../assets/images/recording.jpg" alt="Sharing recording" />
        </div>
      </div>
      <div class="step-card" data-aos="fade-up" data-aos-delay="300">
        <div class="step-content">
          <div class="step-number"><span>3</span></div>
          <h2>Learn Effortlessly</h2>
          <p>
            Recipients can access your video effortlessly through the provided
            link, with our user-friendly interface suitable for everyone.
          </p>
        </div>
        <div class="step-image">
          <img src="../assets/images/recording.jpg" alt="Learning effortlessly" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.how-it-works-section {
  padding: 80px 20px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #f8f9fc;
  border-radius: 20px;
}

.section-heading {
  text-align: center;
  margin-bottom: 60px;
}

.section-heading h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 42px;
  color: #1b233d;
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
}

.section-heading h1::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #120b48, #424b6e);
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
}

.steps-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.step-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  width: 100%;
  max-width: 380px;
  height: 500px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.step-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.step-content {
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.step-number {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(to right, #120b48, #424b6e);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(18, 11, 72, 0.2);
}

.step-number span {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
}

.step-card h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #1b233d;
  margin-bottom: 15px;
}

.step-card p {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #616163;
  margin-bottom: 20px;
}

.step-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.step-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.step-card:hover .step-image img {
  transform: scale(1.05);
}

@media screen and (max-width: 1200px) {
  .steps-container {
    gap: 20px;
  }
  
  .step-card {
    max-width: 350px;
    height: 480px;
  }
}

@media screen and (max-width: 768px) {
  .how-it-works-section {
    padding: 60px 15px;
  }
  
  .section-heading h1 {
    font-size: 36px;
  }
  
  .step-card {
    max-width: 100%;
    height: auto;
  }
  
  .step-content {
    padding: 25px;
  }
  
  .step-image {
    height: 200px;
  }
}

@media screen and (max-width: 480px) {
  .section-heading h1 {
    font-size: 30px;
  }
  
  .step-number {
    width: 60px;
    height: 60px;
  }
  
  .step-number span {
    font-size: 28px;
  }
  
  .step-card h2 {
    font-size: 22px;
  }
  
  .step-image {
    height: 180px;
  }
}
</style>
