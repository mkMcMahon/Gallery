/*
 * blueimp Gallery Fullscreen JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* eslint-disable no-param-reassign */

import $ from './blueimp-helper.js'
import Gallery from './blueimp-gallery.js'
'use strict'

  var galleryPrototype = Gallery.prototype

  $.extend(galleryPrototype.options, {
    // Defines if the gallery should open in fullscreen mode:
    fullscreen: false
  })

  var initialize = galleryPrototype.initialize
  var close = galleryPrototype.close

  $.extend(galleryPrototype, {
    getFullScreenElement: function () {
      return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      )
    },

    requestFullScreen: function (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    },

    exitFullScreen: function () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },

    initialize: function () {
      initialize.call(this)
      if (this.options.fullscreen && !this.getFullScreenElement()) {
        this.requestFullScreen(this.container[0])
      }
    },

    close: function () {
      if (this.getFullScreenElement() === this.container[0]) {
        this.exitFullScreen()
      }
      close.call(this)
    }
  })

export default Gallery
