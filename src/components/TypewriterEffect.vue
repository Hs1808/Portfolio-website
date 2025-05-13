<template>
    <span class="typewriter-text">{{ displayedText }}</span>
    <span class="blinking-cursor">|</span>
  </template>
  
  <script>
  export default {
    name: 'TypewriterEffect',
    props: {
      text: {
        type: Array,
        required: true,
        validator: value => value.length > 0
      },
      typingSpeed: {
        type: Number,
        default: 100 // milliseconds per character
      },
      deletingSpeed: {
        type: Number,
        default: 50 // milliseconds per character
      },
      pauseDuration: {
        type: Number,
        default: 1500 // milliseconds between phrases
      }
    },
    data() {
      return {
        displayedText: '',
        currentPhraseIndex: 0,
        isTyping: true,
        isDeleting: false
      }
    },
    mounted() {
      this.startTyping()
    },
    methods: {
      startTyping() {
        const currentPhrase = this.text[this.currentPhraseIndex]
        
        if (this.isTyping) {
          // Typing logic
          if (this.displayedText.length < currentPhrase.length) {
            this.displayedText = currentPhrase.substring(0, this.displayedText.length + 1)
            setTimeout(this.startTyping, this.typingSpeed)
          } else {
            this.isTyping = false
            setTimeout(this.startTyping, this.pauseDuration)
          }
        } else {
          // Deleting logic
          if (this.displayedText.length > 0) {
            this.displayedText = this.displayedText.substring(0, this.displayedText.length - 1)
            setTimeout(this.startTyping, this.deletingSpeed)
          } else {
            this.isTyping = true
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.text.length
            setTimeout(this.startTyping, this.typingSpeed)
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .typewriter-text {
    display: inline-block;
  }
  
  .blinking-cursor {
    animation: blink 1s step-end infinite;
    margin-left: 2px;
  }
  
  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
  </style>