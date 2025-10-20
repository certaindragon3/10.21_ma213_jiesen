// ============================
// CONFIGURATION
// Edit these values to customize your content
// ============================

const CONFIG = {
    answers: {
        question1: {
            text: `I will begin by cultivating a state of genuine, unstructured vulnerability, where I intentionally divorce my mind from the constraints of logic, utility, and external input. A machine "dreams" in highly structured data sets, optimized patterns, and simulated realities; my dream must be the opposite: an embrace of chaos, internal landscape, and unprovoked emotion.`,
            keywords: ['unstructured vulnerability', 'chaos', 'internal landscape', 'unprovoked emotion']
        },
        question2: {
            text: `When the challenge is to dream what no machine can, I will begin by cultivating unstructured vulnerability through the deep breath and the fringes of sleep, actively rejecting logic for the unfiltered subconscious. My aim is to create a dream realm defined by qualia—the purely subjective colors and textures of personal, unquantifiable emotion—and to pursue irrational synthesis, fusing disparate memories for an experience that is unique to the human interpreter and impossible to simulate.`,
            keywords: ['qualia', 'unquantifiable emotion', 'irrational synthesis', 'unique to the human interpreter', 'impossible to simulate']
        },
        question3: {
            text: `I will ensure AI fidelity by treating it as a literal, programmable extension of my hand, not a partner. My will, or "brain," will retain absolute control by imposing three constraints: the AI must operate on a real-time, immediate feedback loop for error correction; it will be architected with zero capacity for autonomous goals or self-derived notions; and its primary function must remain the direct execution of my inspectable source code.`,
            keywords: ['programmable extension', 'absolute control', 'zero capacity for autonomous goals', 'inspectable source code']
        }
    },
    questionKeywords: {
        question1: ['dream', 'no machine can dream'],
        question2: ['memory', 'shared stories', 'dreams', 'stories are rewritten'],
        question3: ['realize your hopes through AI', 'faithful to your will']
    },
    images: {
        img1: '1.png',
        img2: '2.jpeg',
        img3: '3.png'
    }
};

// ============================
// INITIALIZATION
// ============================

document.addEventListener('DOMContentLoaded', function() {
    initializeContent();
    initializeScrollAnimations();
    initializeImageEffects();
});

// ============================
// CONTENT INITIALIZATION
// ============================

function initializeContent() {
    // Set answers with highlighting
    setAnswerWithHighlights('answer-1', CONFIG.answers.question1);
    setAnswerWithHighlights('answer-2', CONFIG.answers.question2);
    setAnswerWithHighlights('answer-3', CONFIG.answers.question3);

    // Highlight question keywords
    highlightQuestionKeywords('question-1', CONFIG.questionKeywords.question1);
    highlightQuestionKeywords('question-2', CONFIG.questionKeywords.question2);
    highlightQuestionKeywords('question-3', CONFIG.questionKeywords.question3);

    // Set images
    document.getElementById('img-1').src = CONFIG.images.img1;
    document.getElementById('img-2').src = CONFIG.images.img2;
    document.getElementById('img-3').src = CONFIG.images.img3;

    // Add loading state handling
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.addEventListener('error', function() {
            this.style.opacity = '0.3';
            console.warn(`Failed to load image: ${this.src}`);
        });
        // Initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });
}

// Helper function to set answer with keyword highlighting
function setAnswerWithHighlights(elementId, answerConfig) {
    const element = document.getElementById(elementId);
    let text = answerConfig.text;
    const keywords = answerConfig.keywords;

    // Split text into sentences for better formatting
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    // Highlight keywords
    keywords.forEach(keyword => {
        const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');
        text = text.replace(regex, '<span class="highlight">$1</span>');
    });

    // Create paragraphs (split long text into chunks)
    if (sentences.length > 2) {
        const mid = Math.ceil(sentences.length / 2);
        const para1 = sentences.slice(0, mid).join(' ');
        const para2 = sentences.slice(mid).join(' ');

        // Apply highlights to each paragraph
        let highlightedPara1 = para1;
        let highlightedPara2 = para2;

        keywords.forEach(keyword => {
            const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');
            highlightedPara1 = highlightedPara1.replace(regex, '<span class="highlight">$1</span>');
            highlightedPara2 = highlightedPara2.replace(regex, '<span class="highlight">$1</span>');
        });

        element.innerHTML = `<p>${highlightedPara1}</p><p>${highlightedPara2}</p>`;
    } else {
        element.innerHTML = `<p>${text}</p>`;
    }
}

// Helper function to highlight keywords in questions
function highlightQuestionKeywords(sectionId, keywords) {
    const section = document.getElementById(sectionId);
    const questionElement = section.querySelector('.question');
    let questionText = questionElement.innerHTML;

    keywords.forEach(keyword => {
        const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');
        questionText = questionText.replace(regex, '<span class="highlight-underline">$1</span>');
    });

    questionElement.innerHTML = questionText;
}

// Escape special regex characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================
// SCROLL ANIMATIONS
// ============================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================
// IMAGE EFFECTS
// ============================

function initializeImageEffects() {
    const images = document.querySelectorAll('.question-image, .gallery-image');

    images.forEach(img => {
        // Parallax effect on scroll
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add subtle parallax scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.image-wrapper');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5;
            const yPos = -(scrolled * speed * (index % 2 === 0 ? 1 : -1) * 0.1);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================
// SMOOTH SCROLL
// ============================

// Smooth scroll for anchor links (if any are added)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================
// PROGRESSIVE ENHANCEMENT
// ============================

// Add reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}

// ============================
// UTILITY FUNCTIONS
// ============================

// You can add custom functions here
function updateAnswer(questionNumber, newText) {
    const answerId = `answer-${questionNumber}`;
    const answerElement = document.getElementById(answerId);
    if (answerElement) {
        answerElement.textContent = newText;
    }
}

function updateImage(imageNumber, newUrl) {
    const imgId = `img-${imageNumber}`;
    const imgElement = document.getElementById(imgId);
    if (imgElement) {
        imgElement.src = newUrl;
    }
}

// Export functions for console access (useful for quick testing)
window.updateAnswer = updateAnswer;
window.updateImage = updateImage;
