
let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevMouseX = 0;
  prevMouseY = 0;

  mouseX = 0;
  mouseY = 0;
  velocityX = 0;
  velocityY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  constructor(paper) {
    this.paper = paper;
    this.audio = document.getElementById('krishnaAudio');
    this.init();
  }

  init() {
    this.paper.addEventListener('mousedown', (e) => {
      this.holdingPaper = true;
      this.paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.button === 0) {
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }

      // Check if the paper is Krishna and play audio on single click
      if (this.paper.classList.contains('Krishna') && e.detail === 1) {
        this.audio.play();
      }
    });

    this.paper.addEventListener('dblclick', (e) => {
      // Check if the paper is Krishna and pause audio on double click
      if (this.paper.classList.contains('Krishna')) {
        this.audio.pause();
      }
    });

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (this.holdingPaper) {
        this.velocityX = this.mouseX - this.prevMouseX;
        this.velocityY = this.mouseY - this.prevMouseY;

        this.currentPaperX += this.velocityX;
        this.currentPaperY += this.velocityY;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const papers = Array.from(document.querySelectorAll('.paper'));
  papers.forEach((paper) => {
    const p = new Paper(paper);
  });
});

