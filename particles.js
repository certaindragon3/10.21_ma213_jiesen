// ============================
// P5.JS PARTICLE SYSTEM
// Sparkling particles that follow mouse movement
// ============================

let particles = [];
let canvas;

function setup() {
    // Create canvas and position it in the hero section
    const heroSection = document.getElementById('hero-section');
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(heroSection);
    canvas.position(0, 0);
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '1');
    canvas.style('pointer-events', 'none'); // Allow clicks to pass through
}

function draw() {
    clear(); // Transparent background

    // Only create particles when mouse is moving in hero section
    if (mouseY < windowHeight && mouseIsPressed === false) {
        // Create particles with some randomness
        if (frameCount % 2 === 0) { // Create particle every 2 frames
            particles.push(new Particle(mouseX, mouseY));
        }
    }

    // Update and display all particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();

        // Remove dead particles
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x + random(-10, 10);
        this.y = y + random(-10, 10);
        this.size = random(3, 8);
        this.alpha = 255;
        this.fadeRate = random(3, 6);

        // Velocity for floating effect
        this.vx = random(-1, 1);
        this.vy = random(-3, -1); // Float upward

        // Color variation - pink tones
        this.colorVariant = random(0, 3);

        // Sparkle effect
        this.sparkle = random(1) > 0.7; // 30% chance to sparkle
        this.sparklePhase = 0;
    }

    update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Add slight acceleration
        this.vy += 0.05;

        // Fade out
        this.alpha -= this.fadeRate;

        // Update sparkle
        if (this.sparkle) {
            this.sparklePhase += 0.2;
        }
    }

    display() {
        push();

        // Choose color based on variant
        if (this.colorVariant < 1) {
            fill(233, 30, 99, this.alpha); // Primary pink
        } else if (this.colorVariant < 2) {
            fill(255, 64, 129, this.alpha); // Light pink
        } else {
            fill(194, 24, 91, this.alpha); // Dark pink
        }

        noStroke();

        // Sparkle effect
        if (this.sparkle) {
            let sparkleSize = this.size + sin(this.sparklePhase) * 2;
            ellipse(this.x, this.y, sparkleSize, sparkleSize);

            // Add a glow
            fill(255, 255, 255, this.alpha * 0.5);
            ellipse(this.x, this.y, sparkleSize * 0.5, sparkleSize * 0.5);
        } else {
            ellipse(this.x, this.y, this.size, this.size);
        }

        pop();
    }

    isDead() {
        return this.alpha <= 0;
    }
}

// Enhanced effect on mouse movement
function mouseMoved() {
    // Create extra particles on fast movement
    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    if (speed > 5 && mouseY < windowHeight) {
        for (let i = 0; i < floor(speed / 10); i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    }
}

// Create particles on mouse press
function mousePressed() {
    if (mouseY < windowHeight) {
        for (let i = 0; i < 10; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    }
}
