$(document).ready(function () {
  var side1, side2, side3, side4, side5, side6
  var materialsbottom
  var scene, camera, renderer, threejs
  var sides = []
  var flapps = []
  var lengthh = 2
  var condition = 0
  var close = true
  var front = true
  var activeCanvas = null
  var widthh = 2
  var depthh = 2
  var canvasInstances = []
  var canvasInstancesBack = []
  var container = document.getElementById('drawing-canvas')
  var flapplane, flapplane2, flapplane3, flapplane4
  var lookAtVector = new THREE.Vector3(0, 0, 0)
  var WIDTH = window.innerWidth
  var HEIGHT = window.innerHeight
  var group = new THREE.Group()
  var drawStartPos = new THREE.Vector2()
  var de2ra = function (degree) { return degree * (Math.PI / 180) }
  var longside = new THREE.PlaneGeometry(depthh, lengthh, 1, 1)
  var longsideside = new THREE.PlaneGeometry(depthh, lengthh, 1, 1)
  var side4Geom = new THREE.PlaneGeometry(lengthh, depthh, 1, 1)
  var midside = new THREE.PlaneGeometry(widthh, lengthh, 1, 1)
  var shortside = new THREE.PlaneGeometry(depthh, widthh, 1, 1)
  var rectangleflap = new THREE.PlaneGeometry(depthh, depthh, 1, 1)
  var drawingCanvasFabric = new fabric.Canvas('drawing-canvas', {
    backgroundColor: 'white'
  })
  var drawingCanvasThreeFrontin
  var drawingCanvasThreeFrontinBack
  var drawingCanvasThreeLeft
  var drawingCanvasThreeLeftBack

  var drawingCanvasThreeRight
  var drawingCanvasThreeRightBack
  var drawingCanvasThreeBottom
  var drawingCanvasThreeBottomBack
  var drawingCanvasThreeBack
  var drawingCanvasThreeBackBack
  var drawingCanvasThreeTop
  var drawingCanvasThreeTopBack
  var drawingCanvasThreeFront
  var drawingCanvasThreeFrontBack

  var texture_front
  var texture_front_inside
  var texture_left
  var texture_left_inside
  var texture_right
  var texture_right_inside
  var texture_bottom
  var texture_bottom_inside
  var texture_back
  var texture_back_inside
  var texture_top
  var texture_top_inside
  var texture_frontin
  var texture_frontin_inside
  var jsondatafront = []
  var jsondataback = []
  var json_data1
  var json_data2

  initColorPicker()
  init()
  animate()

  $('#btnUpdateSize').click(function () {
    lengthh = $('#txtLength').val() / 100
    widthh = $('#txtWidth').val() / 100
    depthh = $('#txtDepth').val() / 100

    group.scale.x = widthh
    group.scale.y = lengthh
    group.scale.z = depthh
  })

  $('#fontFamily').change(function () {
    var ob = drawingCanvasFabric.getActiveObject()
    if (ob.text != undefined) {
      ob.fontFamily = $('#fontFamily').val()
      drawingCanvasFabric.renderAll()
    }
  })

  $('#fontSize').change(function () {
    var ob = drawingCanvasFabric.getActiveObject()
    if (ob.text != undefined) {
      ob.fontSize = $('#fontSize').val()
      drawingCanvasFabric.renderAll()
    }
  })

  $(document).on('change', '#fontColor', function () {
    var ob = drawingCanvasFabric.getActiveObject()
    if (ob != undefined && ob.text != undefined) {
      ob.fill = $('#fontColor').val()
      drawingCanvasFabric.renderAll()
    }
  })

  $('#originX').click(function () {
    var ob = drawingCanvasFabric.getActiveObject()

    if (ob != undefined) {
      drawingCanvasFabric.centerObjectH(ob)
      ob.setCoords()

      var index = drawingCanvasFabric.getObjects().indexOf(ob)
      ob.clone(function (obj) {
        activeCanvas.insertAt(obj, index, true)
      })
    }

    drawingCanvasFabric.renderAll()
  })

  $('#originY').click(function () {
    var ob = drawingCanvasFabric.getActiveObject()

    if (ob != undefined) {
      drawingCanvasFabric.centerObjectV(ob)
      ob.setCoords()

      var index = drawingCanvasFabric.getObjects().indexOf(ob)
      ob.clone(function (obj) {
        activeCanvas.insertAt(obj, index, true)
      })
    }
    drawingCanvasFabric.renderAll()
  })

  document.getElementById('closebtn').addEventListener('click', function () {
    closeTop()
    close = true
  })

  document.getElementById('openbtn').addEventListener('click', function () {
    openTop()
    close = false
  })

  document.getElementById('leftClose').addEventListener('click', function () {
    if (close) {
      if (!front) {
        jsondataback[condition] = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())
      }
      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())
      drawingCanvasFabric.clear()

      activeCanvas = canvasInstances[1]
      activeCanvas.name = 'leftOut'
      condition = 1

      json_data1 = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(json_data1, function () {
        drawingCanvasFabric.renderAll()
      })
      front = true

      // changeTexture(canvasInstances[0])

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[3].matrixWorld)
      var worldNormal = new THREE.Vector3(-0.5, 0.25, 1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[1].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[1], worldNormal, normalMatrix, camPosition)
      var dimension = widthh / depthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    } else {
      if (front) {
        jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())
      }

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstancesBack[1]
      condition = 1

      json_data1 = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(json_data1, function () {
        drawingCanvasFabric.renderAll()
      })
      front = false

      // changeTexture(canvasInstances[0])

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[3].matrixWorld)
      var worldNormal = new THREE.Vector3(-0.5, 0.25, -1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[1].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[1], worldNormal, normalMatrix, camPosition)
      var dimension = widthh / depthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    }
  })

  document.getElementById('backClose').addEventListener('click', function () {
    if (close) {
      if (!front) {
        jsondataback[condition] = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())
      }

      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstances[4]
      activeCanvas.name = 'backOut'
      condition = 4

      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(jsondatafront[condition], function () {
        drawingCanvasFabric.renderAll()
      })
      front = true

      // drawingCanvasFabric.loadFromJSON(json_data1, function () {
      //    drawingCanvasFabric[0].renderAll();
      // });

      // changeTexture(canvasInstancesBack[0]);

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[3].matrixWorld)
      var worldNormal = new THREE.Vector3(-0.5, -1, 0).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[4].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[4], worldNormal, normalMatrix, camPosition)
      var dimension = lengthh / depthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    } else {
      if (front) {
        jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())
      }

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstancesBack[4]
      condition = 4

      json_data1 = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(json_data1, function () {
        drawingCanvasFabric.renderAll()
      })
      front = false

      // changeTexture(canvasInstances[0])

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[4].matrixWorld)
      var worldNormal = new THREE.Vector3(0, 1, 1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[4].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[4], worldNormal, normalMatrix, camPosition)
      var dimension = lengthh / depthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    }
  })

  document.getElementById('frontClose').addEventListener('click', function () {
    if (close) {
      if (!front) {
        jsondataback[condition] = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())
      }
      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstances[6]
      activeCanvas.name = 'frontOut'
      condition = 6

      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(jsondatafront[condition], function () {
        drawingCanvasFabric.renderAll()
      })

      front = true

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[2].matrixWorld)
      var worldNormal = new THREE.Vector3(-0.5, 0.5, -1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[2].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[2], worldNormal, normalMatrix, camPosition)

      var dimension = lengthh / depthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    } else {
      if (front) {
        jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())
      }

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstancesBack[6]
      condition = 6

      json_data1 = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(json_data1, function () {
        drawingCanvasFabric.renderAll()
      })
      front = false

      // changeTexture(canvasInstances[0])

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[2].matrixWorld)
      var worldNormal = new THREE.Vector3(-1, 1, -1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[2].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[2], worldNormal, normalMatrix, camPosition)
      var dimension = lengthh / depthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    }
  })

  document.getElementById('rightClose').addEventListener('click', function () {
    if (close) {
      if (!front) {
        jsondataback[condition] = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())
      }
      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstances[3]
      activeCanvas.name = 'rightOut'
      condition = 3

      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(jsondatafront[condition], function () {
        drawingCanvasFabric.renderAll()
      })

      front = true

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[2].matrixWorld)
      var worldNormal = new THREE.Vector3(-1, -1, 1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[3].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[3], worldNormal, normalMatrix, camPosition)

      var dimension = widthh / depthh
      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    } else {
      if (front) {
        jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())
      }

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstancesBack[3]
      condition = 3

      json_data1 = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(json_data1, function () {
        drawingCanvasFabric.renderAll()
      })
      front = false

      // changeTexture(canvasInstances[0])

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[3].matrixWorld)
      var worldNormal = new THREE.Vector3(0, -1, -1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[3].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[3], worldNormal, normalMatrix, camPosition)
      var dimension = widthh / depthh
      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    }
  })

  document.getElementById('bottomClose').addEventListener('click', function () {
    if (close) {
      if (!front) {
        jsondataback[condition] = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())
      }
      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstances[0]
      activeCanvas.name = 'bottomOut'
      condition = 0

      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(jsondatafront[condition], function () {
        drawingCanvasFabric.renderAll()
      })

      front = true

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[2].matrixWorld)
      var worldNormal = new THREE.Vector3(1, -0.25, -0.5).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[0].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[0], worldNormal, normalMatrix, camPosition)

      var dimension = widthh / depthh
      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    } else {
      if (front) {
        jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())
      }

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstancesBack[0]
      condition = 0

      json_data1 = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(json_data1, function () {
        drawingCanvasFabric.renderAll()
      })
      front = false

      // changeTexture(canvasInstances[0])

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[0].matrixWorld)
      var worldNormal = new THREE.Vector3(0, -1, -1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[0].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[0], worldNormal, normalMatrix, camPosition)
      var dimension = widthh / depthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    }
  })

  document.getElementById('topClose').addEventListener('click', function () {
    if (close) {
      if (!front) {
        jsondataback[condition] = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())
      }
      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstances[5]
      activeCanvas.name = 'topOut'
      condition = 5

      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(jsondatafront[condition], function () {
        drawingCanvasFabric.renderAll()
      })

      front = true

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[5].matrixWorld)
      var worldNormal = new THREE.Vector3(-1, 0.5, -1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[5].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[5], worldNormal, normalMatrix, camPosition)

      var dimension = lengthh / widthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    } else {
      if (front) {
        jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())
      }

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstancesBack[5]
      condition = 5

      json_data1 = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(json_data1, function () {
        drawingCanvasFabric.renderAll()
      })
      front = false

      // changeTexture(canvasInstances[0])

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[5].matrixWorld)
      var worldNormal = new THREE.Vector3(0, -0.5, 1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[5].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[5], worldNormal, normalMatrix, camPosition)
      var dimension = lengthh / widthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    }
  })

  document.getElementById('frontinClose').addEventListener('click', function () {
    if (close) {
      if (!front) {
        jsondataback[condition] = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())
      }
      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstances[2]
      condition = 2

      jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(jsondatafront[condition], function () {
        drawingCanvasFabric.renderAll()
      })

      front = true

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[5].matrixWorld)
      var worldNormal = new THREE.Vector3(-1, 1, -1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[2].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[2], worldNormal, normalMatrix, camPosition)

      var dimension = lengthh / widthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    } else {
      if (front) {
        jsondatafront[condition] = JSON.stringify(canvasInstances[condition].toDatalessJSON())
      }

      drawingCanvasFabric.clear()
      activeCanvas = canvasInstancesBack[2]
      condition = 2

      json_data1 = JSON.stringify(canvasInstancesBack[condition].toDatalessJSON())

      drawingCanvasFabric.loadFromJSON(json_data1, function () {
        drawingCanvasFabric.renderAll()
      })
      front = false

      // changeTexture(canvasInstances[0])

      var normalMatrix = new THREE.Matrix3().getNormalMatrix(sides[2].matrixWorld)
      var worldNormal = new THREE.Vector3(0, -1, -1).applyMatrix3(normalMatrix).normalize()

      var camPosition = new THREE.Vector3().copy(sides[2].position).add(worldNormal.multiplyScalar(8))
      animateCam(sides[2], worldNormal, normalMatrix, camPosition)
      var dimension = lengthh / widthh

      drawingCanvasFabric.width = 256
      drawingCanvasFabric.height = 256 / dimension
      drawingCanvasFabric.setDimensions({ width: 256, height: 256 / dimension })
    }
  })

  document.getElementById('btnAddText').addEventListener('click', function () {
    var textbox = new fabric.Textbox('Lorum ipsum dolor sit amet', {

      width: 150,
      fontSize: $('#fontSize').val(),
      fill: $('#fontColor').val(),
      fontFamily: $('#fontFamily').val(),
      lockScalingX: false,
      lockScalingY: false

    })
    drawingCanvasFabric.centerObjectV(textbox)
    drawingCanvasFabric.centerObjectH(textbox)
    textbox.setCoords()
    drawingCanvasFabric.add(textbox)
    drawingCanvasFabric.renderAll()
  }, false)

  document.getElementById('btnAddImage').addEventListener('click', function () {
    var imgElement = document.getElementById('my-image')
    var imgInstance = new fabric.Image(imgElement, {
      left: 0,
      top: 0
    })

    drawingCanvasFabric.centerObjectV(imgInstance)
    drawingCanvasFabric.centerObjectH(imgInstance)
    imgInstance.setCoords()
    drawingCanvasFabric.add(imgInstance)
    drawingCanvasFabric.renderAll()
  }, false)

  function initColorPicker () {
    $('#inputColor').ColorPicker({
      flat: true,
      onChange: function (hsb, hex, rgb) {
        if (activeCanvas.name == 'leftOut') {
          sides[1].material[0].color = new THREE.Color('rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')')

          sides[1].material[0].needsUpdate = true
        }
        if (activeCanvas.name == 'backOut') {
          sides[4].material[0].color = new THREE.Color('rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')')

          sides[4].material[0].needsUpdate = true
        }
        if (activeCanvas.name == 'frontOut') {
          sides[2].material[0].color = new THREE.Color('rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')')

          sides[2].material[0].needsUpdate = true
        }
        if (activeCanvas.name == 'rightOut') {
          sides[3].material[0].color = new THREE.Color('rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')')

          sides[3].material[0].needsUpdate = true
        }
        if (activeCanvas.name == 'bottomOut') {
          sides[0].material[0].color = new THREE.Color('rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')')

          sides[0].material[0].needsUpdate = true
        }
        if (activeCanvas.name == 'topOut') {
          sides[5].material[0].color = new THREE.Color('rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')')

          sides[5].material[0].needsUpdate = true
        }
      }
    })
  }

  function initCameraScene () {
    threejs = document.getElementById('threejs')
    scene = new THREE.Scene()

    if (renderer != null) { renderer.clear() }

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor(0xaaccaa, 1)
    renderer.shadowMapEnabled = true
    renderer.shadowMapSoft = true

    threejs.appendChild(renderer.domElement)

    camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 1000)
    camera.position.set(10, 10, 12)
    camera.lookAt(scene.position)
    scene.add(camera)
    scene.add(group)
  }

  function addGui () {
    var controller = new function () {
      this.scaleX = 1
      this.scaleY = 1
      this.scaleZ = 1
      this.positionX = 0
      this.positionY = 0
      this.positionZ = 0
      this.rotationX = 0
      this.rotationY = 90
      this.rotationZ = 0
      this.castShadow = true
      this.foldCube = true
      this.openTop = true
      this.closeTop = true
    }()

    var gui = new dat.GUI()
    var f1 = gui.addFolder('Scale')
    f1.add(controller, 'scaleX', 0.1, 5).onChange(function () {
      group.scale.x = (controller.scaleX)
    })
    f1.add(controller, 'scaleY', 0.1, 5).onChange(function () {
      group.scale.y = (controller.scaleY)
    })
    f1.add(controller, 'scaleZ', 0.1, 5).onChange(function () {
      group.scale.z = (controller.scaleZ)
    })

    var f2 = gui.addFolder('Scaleflaps')
    f2.add(controller, 'scaleX', 0.1, 5).onChange(function () {
      groupflap.scale.x = (controller.scaleX)
    })
    f2.add(controller, 'scaleY', 0.1, 5).onChange(function () {
      groupflap.scale.y = (controller.scaleY)
    })
    f2.add(controller, 'scaleZ', 0.1, 5).onChange(function () {
      groupflap.scale.z = (controller.scaleZ)
    })

    var f3 = gui.addFolder('Position')
    f3.add(controller, 'positionX', -5, 5).onChange(function () {
      group.position.x = (controller.positionX)
    })
    f3.add(controller, 'positionY', -3, 5).onChange(function () {
      group.position.y = (controller.positionY)
    })
    f3.add(controller, 'positionZ', -5, 5).onChange(function () {
      group.position.z = (controller.positionZ)
    })

    var f4 = gui.addFolder('Positionfold')
    f4.add(controller, 'positionX', -5, 5).onChange(function () {
      side5.rotation.x = (controller.positionX)
    })
    f4.add(controller, 'positionY', -3, 5).onChange(function () {
      side5.rotation.y = (controller.positionY)
    })
    f4.add(controller, 'positionZ', -5, 5).onChange(function () {
      side5.rotation.z = (controller.positionZ)
    })

    var f5 = gui.addFolder('rotationfold')
    f5.add(controller, 'rotationX', -5, 5).onChange(function () {
      flapplane.rotation.x = (controller.rotationX)
      flapplane2.rotation.x = (controller.rotationX)
      flapplane3.rotation.x = (controller.rotationX)
      flapplane4.rotation.x = (controller.rotationX)
    })
    f5.add(controller, 'rotationY', -3, 5).onChange(function () {
      flapplane.rotation.y = (controller.rotationY)
    })
    f5.add(controller, 'rotationZ', -5, 5).onChange(function () {
      flapplane.rotation.z = (controller.rotationZ)
    })

    var f6 = gui.addFolder('rotationpivot')
    f6.add(controller, 'rotationX', -5, 5).onChange(function () {
      pivot.rotation.x = (controller.rotationX)
    })
    f6.add(controller, 'rotationY', -3, 5).onChange(function () {
      pivot.rotation.y = (controller.rotationY)
    })
    f6.add(controller, 'rotationZ', -5, 5).onChange(function () {
      pivot.rotation.z = (controller.rotationZ)
    })

    var f7 = gui.addFolder('Rotation')
    f7.add(controller, 'rotationX', -180, 180).onChange(function () {
      group.rotation.x = de2ra(controller.rotationX)
    })
    f7.add(controller, 'rotationY', -180, 180).onChange(function () {
      group.rotation.y = de2ra(controller.rotationY)
    })
    f7.add(controller, 'rotationZ', -180, 180).onChange(function () {
      group.rotation.z = de2ra(controller.rotationZ)
    })

    gui.add(controller, 'castShadow', false).onChange(function () {
      group.castShadow = controller.castShadow
    })
    gui.add(controller, 'foldCube', false).onChange(function () {
      group.foldCube = controller.foldCube
      foldCube()
    })

    gui.add(controller, 'openTop', false).onChange(function () {
      group.openTop = controller.openTop
      openTop()
    })

    gui.add(controller, 'closeTop', false).onChange(function () {
      group.closeTop = controller.closeTop
      closeTop()
    })
  }

  function init () {
    $('.dg.ac').empty()
    initCameraScene()

    var geom = new THREE.PlaneGeometry(lengthh, widthh)
    geom.name = 'kutu'
    var side0 = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: 'pink', wireframe: false, side: THREE.DoubleSide }))
    side0.rotation.x = -Math.PI / 2
    sides.push(side0)

    longside.translate(-(depthh / 2), 0, 0)
    shortside.translate(-(depthh / 2), 0, 0)
    midside.translate(-(widthh / 2), 0, 0)

    longsideside.translate(0, (depthh / 2), 0)
    side4Geom.translate(-(depthh / 2), (depthh / 2), 0)

    side1 = new THREE.Mesh(shortside, new THREE.MeshBasicMaterial({ color: 'purple', wireframe: false }))
    sides.push(side1)
    side2 = new THREE.Mesh(longside, new THREE.MeshBasicMaterial({ color: 'grey', wireframe: false }))
    sides.push(side2)
    side3 = side1.clone(); sides.push(side3)
    side4 = new THREE.Mesh(side4Geom, new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false })); sides.push(side4)
    side5 = new THREE.Mesh(midside, new THREE.MeshBasicMaterial({ color: 'purple', wireframe: false }))
    sides.push(side5)

    flapplane = new THREE.Mesh(shortside, new THREE.MeshBasicMaterial({ color: 'red', wireframe: false, visible: false }))

    flapplane3 = new THREE.Mesh(rectangleflap, new THREE.MeshBasicMaterial({ color: 'pink', wireframe: false, visible: false }))

    side6 = side2.clone(); sides.push(side6)
    flapplane2 = flapplane.clone()

    flapplane4 = flapplane3.clone()

    var pivot = new THREE.Object3D()

    var pivot2 = new THREE.Object3D()

    var groupflap = new THREE.Group()
    var groupflapss = new THREE.Group()
    var groupflapss2 = new THREE.Group()
    var groupflapssk = new THREE.Group()
    var groupflapssk2 = new THREE.Group()

    var roundedRectShape = new THREE.Shape()
    roundedRect(roundedRectShape, 0, 0, widthh, depthh, 0.2)

    var smallFlapShape = new THREE.Shape()
    Track(smallFlapShape, 0, 0, 200, depthh, depthh / 5)

    var geometryflap2 = new THREE.ShapeBufferGeometry(smallFlapShape)
    var materialflap2 = new THREE.MeshBasicMaterial({ color: 0xefefef, side: THREE.DoubleSide })
    var meshflap1k = new THREE.Mesh(geometryflap2, materialflap2)
    var meshflap1k2 = meshflap1k.clone()

    var geometryflap1 = new THREE.ShapeBufferGeometry(roundedRectShape)
    var materialflap1 = new THREE.MeshBasicMaterial({ color: 0xefefef, side: THREE.DoubleSide })
    var meshflap1b = new THREE.Mesh(geometryflap1, materialflap1)
    var meshflap1b2 = meshflap1b.clone()

    groupflapss.add(meshflap1b)
    groupflapss2.add(meshflap1b2)

    groupflapssk.add(meshflap1k)
    groupflapssk2.add(meshflap1k2)

    groupflapss.scale.multiplyScalar(1)
    groupflapssk.scale.multiplyScalar(1)

    flapplane.add(groupflapss)
    flapplane2.add(groupflapss2)

    flapplane3.add(groupflapssk)
    flapplane4.add(groupflapssk2)

    groupflapss.position.set(0, -widthh / 2, 0); groupflapss.rotation.x = -Math.PI; groupflapss.rotation.z = -Math.PI / 2
    groupflapss2.position.set(0, -widthh / 2, 0); groupflapss2.rotation.z = Math.PI / 2

    createCanvas(lengthh, widthh, sides[0], 0, 'left')
    createCanvas(widthh, depthh, sides[1], 1, 'left')
    createCanvas(lengthh, depthh, sides[2], 2, 'left')
    createCanvas(widthh, depthh, sides[3], 3, 'right')
    createCanvas(lengthh, depthh, sides[4], 4, 'left')
    createCanvas(lengthh, widthh, sides[5], 5, 'left')
    createCanvas(widthh, depthh, sides[6], 6, 'left')

    createTextureThree()

    texture_front = new THREE.CanvasTexture(drawingCanvasThreeFrontin)
    texture_front_inside = new THREE.CanvasTexture(drawingCanvasThreeFrontinBack)
    texture_left = new THREE.CanvasTexture(drawingCanvasThreeLeft)
    texture_left_inside = new THREE.CanvasTexture(drawingCanvasThreeLeftBack)
    texture_right = new THREE.CanvasTexture(drawingCanvasThreeRight)
    texture_right_inside = new THREE.CanvasTexture(drawingCanvasThreeRightBack)
    texture_bottom = new THREE.CanvasTexture(drawingCanvasThreeBottom)
    texture_bottom_inside = new THREE.CanvasTexture(drawingCanvasThreeBottomBack)
    texture_back = new THREE.CanvasTexture(drawingCanvasThreeBack)
    texture_back_inside = new THREE.CanvasTexture(drawingCanvasThreeBackBack)
    texture_top = new THREE.CanvasTexture(drawingCanvasThreeTop)

    texture_top_inside = new THREE.CanvasTexture(drawingCanvasThreeTopBack)
    texture_frontin = new THREE.CanvasTexture(drawingCanvasThreeFront)
    texture_frontin_inside = new THREE.CanvasTexture(drawingCanvasThreeFrontBack)

    texture_left.wrapS = THREE.RepeatWrapping
    texture_left.repeat.x = -1
    texture_right.wrapS = THREE.RepeatWrapping
    texture_right.repeat.x = -1
    texture_back.wrapS = THREE.RepeatWrapping
    texture_back.repeat.x = -1

    texture_front.needsUpdate = true
    texture_front_inside.needsUpdate = true
    texture_left.needsUpdate = true
    texture_left_inside.needsUpdate = true
    texture_right.needsUpdate = true
    texture_right_inside.needsUpdate = true
    texture_bottom.needsUpdate = true
    texture_bottom_inside.needsUpdate = true
    texture_back.needsUpdate = true
    texture_back_inside.needsUpdate = true
    texture_top.needsUpdate = true
    texture_top_inside.needsUpdate = true
    texture_frontin.needsUpdate = true
    texture_frontin_inside.needsUpdate = true
    texture_top.flipY = false
    texture_bottom.flipY = false
    texture_frontin.flipY = false

    side5.geometry.faceVertexUvs[0][0][0].set(1, 1) // 0, 1 => 0.5, 1.0
    side5.geometry.faceVertexUvs[0][0][1].set(0, 1) // 0, 0 => 0.0, 0.5
    side5.geometry.faceVertexUvs[0][0][2].set(1, 0) // 1, 1 => 1.0, 0.5
    side5.geometry.faceVertexUvs[0][1][0].set(0, 1) // 0, 0 => 0.0, 0.5
    side5.geometry.faceVertexUvs[0][1][1].set(0, 0) // 1, 0 => 0.5, 0.0
    side5.geometry.faceVertexUvs[0][1][2].set(1, 0) // 1, 1 => 1.0,

    side1.geometry.faceVertexUvs[0][0][0].set(1, 1) // 0, 1 => 0.5, 1.0
    side1.geometry.faceVertexUvs[0][0][1].set(0, 1) // 0, 0 => 0.0, 0.5
    side1.geometry.faceVertexUvs[0][0][2].set(1, 0) // 1, 1 => 1.0, 0.5
    side1.geometry.faceVertexUvs[0][1][0].set(0, 1) // 0, 0 => 0.0, 0.5
    side1.geometry.faceVertexUvs[0][1][1].set(0, 0) // 1, 0 => 0.5, 0.0
    side1.geometry.faceVertexUvs[0][1][2].set(1, 0) // 1, 1 => 1.0,

    var materialsfront = []
    var materialsleft = []
    var materialsright = []
    var materialsbottom = []
    var materialsfrontin = []
    var materialsback = []
    var materialstop = []
    // material = new THREE.MeshBasicMaterial({
    //    transparent: true, depthWrite: false, depthTest: false,
    //    side: THREE.FrontSide, map: texture
    // });

    var materials = []
    // material = new THREE.MeshBasicMaterial({
    //    transparent: true, depthWrite: false, depthTest: false,
    //    side: THREE.FrontSide, map: texture
    // });

    var material1 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.FrontSide,
      map: texture_front
    })
    var material2 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.BackSide,
      map: texture_front_inside
    })

    var material_front1 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.BackSide,
      map: texture_front
    })
    var material_front2 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.FrontSide,
      map: texture_front_inside
    })

    var material_left1 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.BackSide,
      map: texture_left
    })
    var material_left2 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.FrontSide,
      map: texture_left_inside
    })

    var material_right1 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.BackSide,
      map: texture_right
    })
    var material_right2 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.FrontSide,
      map: texture_right_inside
    })

    var material_bottom1 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.BackSide,
      map: texture_bottom
    })
    var material_bottom2 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.FrontSide,
      map: texture_bottom_inside
    })

    var material_back1 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.BackSide,
      map: texture_back
    })
    var material_back2 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.FrontSide,
      map: texture_back_inside
    })

    var material_top1 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.BackSide,
      map: texture_top
    })
    var material_top2 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.FrontSide,
      map: texture_top_inside
    })

    var material_frontin1 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.BackSide,
      map: texture_frontin
    })
    var material_frontin2 = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.FrontSide,
      map: texture_frontin_inside
    })

    // materials.push(material);
    materials.push(material_front1)

    materials.push(material_front2)

    materialsfront.push(material_front1)

    materialsfront.push(material_front2)

    materialsleft.push(material_left1)

    materialsleft.push(material_left2)

    materialsright.push(material_right1)

    materialsright.push(material_right2)

    materialsbottom.push(material_bottom1)

    materialsbottom.push(material_bottom2)

    materialsback.push(material_back1)

    materialsback.push(material_back2)

    materialsfrontin.push(material_frontin1)

    materialsfrontin.push(material_frontin2)

    materialstop.push(material_top1)

    materialstop.push(material_top2)

    // mat = new THREE.MeshFaceMaterial(materials);

    for (var i = 0; i < 7; i++) {
      copyFaces(sides[i])
    }
    sides[0].material = materialsbottom
    sides[1].material = materialsleft
    sides[2].material = materialsfront
    sides[3].material = materialsright
    sides[4].material = materialsback
    sides[5].material = materialstop
    sides[6].material = materialsfrontin

    side6.geometry.faceVertexUvs[0][0][0].set(1, 1) // 0, 1 => 0.5, 1.0
    side6.geometry.faceVertexUvs[0][0][1].set(0, 1) // 0, 0 => 0.0, 0.5
    side6.geometry.faceVertexUvs[0][0][2].set(1, 0) // 1, 1 => 1.0, 0.5
    side6.geometry.faceVertexUvs[0][1][0].set(0, 1) // 0, 0 => 0.0, 0.5
    side6.geometry.faceVertexUvs[0][1][1].set(0, 0) // 1, 0 => 0.5, 0.0
    side6.geometry.faceVertexUvs[0][1][2].set(1, 0) // 1, 1 => 1.0,

    // side6.material = mat;

    group.add(side0)
    group.add(side1)
    group.add(side2)
    group.add(side3)
    group.add(side4)
    group.add(side5)
    group.add(side6)

    group.add(flapplane)
    group.add(flapplane2)
    group.add(flapplane3)
    group.add(flapplane4)

    var leftchain = new THREE.Mesh(longside, new THREE.MeshBasicMaterial({ color: 'white', wireframe: false }))

    // hierarchy
    side1.position.set(-(lengthh / 2), 0, 0)
    side0.add(side1)
    side2.position.set(0, -(widthh / 2), 0)
    side2.rotation.z = Math.PI / 2
    side0.add(side2)
    side3.position.set((lengthh / 2), 0, 0)
    side3.rotation.z = Math.PI
    side0.add(side3)
    side4.position.set(depthh / 2, widthh / 2, 0)
    side4.rotation.z = Math.PI * 2
    side0.add(side4)
    side5.position.set(-depthh / 2, (depthh), 0)
    side5.rotation.z = -Math.PI / 2
    side4.add(side5)
    side6.position.set(-(widthh), 0, 0)
    side5.rotation.z = -Math.PI / 2
    side5.add(side6)
    flapplane.position.set(-((widthh / 2)), -((lengthh / 2)), -0)
    flapplane.rotation.z = -Math.PI / 2
    side5.add(flapplane)
    flapplane2.position.set((-(widthh / 2)), (lengthh / 2), -0)
    flapplane2.rotation.z = -Math.PI / 2
    side5.add(flapplane2)
    flapplane3.position.set(0, -lengthh / 2, -0)
    flapplane3.rotation.z = -Math.PI / 2
    flapplane3.rotation.y = -Math.PI
    side6.add(flapplane3)
    flapplane4.position.set(0, lengthh / 2, -0)
    flapplane4.rotation.z = Math.PI / 2
    side6.add(flapplane4)
    side5.add(pivot)
    side5.add(pivot2)

    var controls = new THREE.OrbitControls(camera, renderer.domElement)
    window.addEventListener('resize', onWindowResize, false)

    addGui()

    flapps.push(flapplane)
    flapps.push(flapplane2)
    flapps.push(flapplane3)
    flapps.push(flapplane4)

    container.width = 256
    container.height = 128

    drawingCanvasFabric.on('object:added', onModified)
    drawingCanvasFabric.on('object:modified', onModified)
    drawingCanvasFabric.on('object:scaling', onModified)
    drawingCanvasFabric.on('object:moving', onModified)
    drawingCanvasFabric.on('object:click', onModified)
    drawingCanvasFabric.on('after:render', function (options) {
      texture_front.needsUpdate = true
      texture_front_inside.needsUpdate = true
      texture_left.needsUpdate = true
      texture_left_inside.needsUpdate = true
      texture_right.needsUpdate = true
      texture_right_inside.needsUpdate = true
      texture_bottom.needsUpdate = true
      texture_bottom_inside.needsUpdate = true
      texture_back.needsUpdate = true
      texture_back_inside.needsUpdate = true
      texture_top.needsUpdate = true
      texture_top_inside.needsUpdate = true
      texture_frontin.needsUpdate = true
      texture_frontin_inside.needsUpdate = true
    })

    loadPattern('../Orcun/left.png')
    foldCube()
  }

  function animateCam (obj, worldNormal, normalMatrix, camPosition) {
    var rotateTween = new TWEEN.Tween(lookAtVector)
      .to({
        x: obj.position.x,
        y: obj.position.y,
        z: obj.position.z
      }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function () {
        camera.lookAt(lookAtVector.copy(obj.position))
      })
      .onComplete(function () {
        lookAtVector.copy(obj.position)
      })
      .start()

    var goTween = new TWEEN.Tween(camera.position)
      .to(camPosition, 1000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .start()
  }

  function onModified (option) {
    if (activeCanvas != null) {
      var ob = option.target

      var index = drawingCanvasFabric.getObjects().indexOf(ob)
      ob.clone(function (obj) {
        activeCanvas.insertAt(obj, index, true)
      })
    }
  };

  function copyFaces (sideface) {
    for (var i = 0, len = sideface.geometry.faces.length; i < len; i++) {
      var face = sideface.geometry.faces[i].clone()
      face.materialIndex = 1
      sideface.geometry.faces.push(face)
      sideface.geometry.faceVertexUvs[0].push(sideface.geometry.faceVertexUvs[0][i].slice(0))
    }
  }

  function Track (ctx, x, y, width, height, radius) {
    ctx.moveTo(x, y)
    ctx.lineTo(x, height)
    ctx.absarc(x, y + radius / 2, height - radius / 2, 1 * Math.PI / 2, 0, true)
    ctx.bezierCurveTo(
      x + height - (radius / 2), y + (radius / 2),
      x + height - (radius / 2), y,
      x + height - radius, y

    )
    ctx.lineTo(x, y)
  }

  function roundedRect (ctx, x, y, width, height, radius) {
    ctx.moveTo(x, y)
    ctx.lineTo(x + ((height - radius) * (Math.sin(10 * Math.PI / 180))), y + height - radius)
    ctx.bezierCurveTo(
      x + ((height - (radius / 2)) * (Math.sin(10 * Math.PI / 180))), y + height - (radius / 2),
      x + ((height - radius) * (Math.sin(10 * Math.PI / 180))) + (radius) - (radius / 2), y + height,
      x + ((height - radius) * (Math.sin(10 * Math.PI / 180))) + radius, y + height

    )

    ctx.lineTo(x + width - (((height - radius) * (Math.sin(10 * Math.PI / 180)))) - radius, y + height)
    ctx.bezierCurveTo(
      x + width - ((height - radius) * (Math.sin(10 * Math.PI / 180))) - radius + (radius / 2), y + height,
      x + width - ((height - (radius / 2)) * (Math.sin(10 * Math.PI / 180))), y + height - (radius / 2),
      x + width - ((height - radius) * (Math.sin(10 * Math.PI / 180))), y + height - (radius))

    ctx.lineTo(x + (width), y)
    ctx.lineTo(x, y)
  }

  function updateCanvas () {
    JSON.stringify(drawingCanvasThreeFrontin)
  }

  function loadPattern (url) {
    var shape = new fabric.Rect({
      width: 256,
      height: 256,
      lockRotation: true,
      lockScalingY: true,
      lockScalingX: true,
      lockMovementY: true,
      lockMovementX: true,
      lockUniScaling: true,
      selectable: false
    })
    // fabric.Object.prototype.transparentCorners = false;
    drawingCanvasFabric.add(shape)
    drawingCanvasFabric.sendToBack(shape)
    fabric.util.loadImage(url, function (img) {
      shape.set('fill', new fabric.Pattern({
        source: img
      }))
      drawingCanvasFabric.renderAll()
      updateCanvas()
    })
  }

  function onWindowResize () {
    windowHalfX = window.innerWidth / 2
    windowHalfY = window.innerHeight / 2

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function animate () {
    requestAnimationFrame(animate)
    TWEEN.update()
    render()
  }

  function render () {
    renderer.render(scene, camera)
  }

  function foldCube () {
    var sidesBeforeRotation = sides
    var flappsBeforeRotation = flapps

    var start = { value: 0 }
    var finish = { value: Math.PI / 2 }
    var angle = 0
    new TWEEN
      .Tween(start)
      .to(finish, 1000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle = this.value
        sides[1].rotation.y = angle
        sides[2].rotation.x = -angle
        sides[3].rotation.y = -angle
        sides[4].rotation.x = angle

        flapplane.rotation.x = -angle
        flapplane2.rotation.x = angle
        flapplane3.rotation.x = -angle
        flapplane4.rotation.x = angle
      })
      .start().onComplete(function () {
        toptween()
      })
  }

  function toptween () {
    var start = { value: 0 }
    var finish = { value: Math.PI / 2 }
    var angle = 0
    new TWEEN
      .Tween(start)
      .to(finish, 1000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle = this.value
        sides[5].rotation.x = angle
        sides[6].rotation.y = angle
      }).start().onComplete(function () {
        flapplane.visible = false
        flapplane2.visible = false
        flapplane3.visible = false
        flapplane4.visible = false
      })
  };

  function toptween2 () {
    var start = { value: -Math.PI / 2 }
    var finish = { value: Math.PI / 2 }
    var angle = 0
    new TWEEN
      .Tween(start)
      .to(finish, 1000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle = this.value
        sides[5].rotation.x = angle
      }).start().onComplete(function () {
        flapplane.visible = false
        flapplane2.visible = false
        flapplane3.visible = false
        flapplane4.visible = false
      })
  };

  function toptween4 () {
    var start = { value: Math.PI / 2 }
    var finish = { value: 0 }
    var angle = 0
    new TWEEN
      .Tween(start)
      .to(finish, 1000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle = this.value

        flapplane.rotation.x = -angle
        flapplane2.rotation.x = angle
        flapplane3.rotation.x = -angle
        flapplane4.rotation.x = angle
      }).start().onComplete(function () {
      })
  };

  function openTop () {
    flapplane.visible = true
    flapplane2.visible = true
    flapplane3.visible = true
    flapplane4.visible = true

    var start = { value: -Math.PI / 2 }
    var finish = { value: Math.PI / 2 }
    var angle = 0
    new TWEEN
      .Tween(start)
      .to(finish, 1000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle = this.value

        sides[5].rotation.x = -angle
      }).start().onComplete(function () {
        toptween4()
      })
  }

  function closeTop () {
    var start = { value: 0 }
    var finish = { value: Math.PI / 2 }
    var angle = 0
    new TWEEN
      .Tween(start)
      .to(finish, 1000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle = this.value

        flapplane.rotation.x = -angle
        flapplane2.rotation.x = angle
        flapplane3.rotation.x = -angle
        flapplane4.rotation.x = angle
      }).start().onComplete(function () {
        toptween2()
      })
  }

  function draw (drawContext, x, y, material) {
    drawContext.moveTo(drawStartPos.x, drawStartPos.y)
    drawContext.strokeStyle = '#fff'
    drawContext.lineTo(x, y)
    drawContext.stroke()
    // reset drawing start position to current position.
    drawStartPos.set(x, y)
    // need to flag the map as needing updating.
    material.map.needsUpdate = true
  }

  function createCanvas (width, height, side, num, sidename) {
    var dimension = width / height

    var newcanvas = document.createElement('canvas')
    var newcanvasBack = document.createElement('canvas')
    newcanvas.id = num + 'front'
    newcanvasBack.id = num + 'back'
    document.getElementById('containercanvas').appendChild(newcanvas)
    document.getElementById('containercanvas').appendChild(newcanvasBack)

    var fabricCanvasObj = new fabric.StaticCanvas(newcanvas)
    var fabricCanvasObjBack = new fabric.StaticCanvas(newcanvasBack)
    fabricCanvasObj.setDimensions({ width: 256, height: 256 / dimension })
    fabricCanvasObjBack.setDimensions({ width: 256, height: 256 / dimension })
    fabricCanvasObj.setBackgroundColor('rgba(255, 255, 255,1)', fabricCanvasObj.renderAll.bind(fabricCanvasObj))
    fabricCanvasObjBack.setBackgroundColor('rgba(255, 255, 255,1)', fabricCanvasObjBack.renderAll.bind(fabricCanvasObjBack))
    fabricCanvasObj.setBackgroundImage('../Orcun/' + sidename + '.png', fabricCanvasObj.renderAll.bind(fabricCanvasObj), {
      backgroundImageOpacity: 0.5,
      backgroundImageStretch: true
    })

    fabricCanvasObjBack.setBackgroundImage('../Orcun/' + sidename + '.png', fabricCanvasObjBack.renderAll.bind(fabricCanvasObjBack), {
      backgroundImageOpacity: 0.5,
      backgroundImageStretch: true
    })
    canvasInstances.push(fabricCanvasObj)
    canvasInstancesBack.push(fabricCanvasObjBack)

    jsondatafront.push(fabricCanvasObj.toDatalessJSON())
    jsondataback.push(fabricCanvasObjBack.toDatalessJSON())

    console.log(jsondatafront, jsondataback)
  }

  function createTextureThree () {
    drawingCanvasThreeBottom = document.getElementById('0front')
    drawingCanvasThreeBottomBack = document.getElementById('0back')
    drawingCanvasThreeLeft = document.getElementById('1front')
    drawingCanvasThreeLeftBack = document.getElementById('1back')

    drawingCanvasThreeFrontin = document.getElementById('2front')
    drawingCanvasThreeFrontinBack = document.getElementById('2back')

    drawingCanvasThreeRight = document.getElementById('3front')
    drawingCanvasThreeRightBack = document.getElementById('3back')
    drawingCanvasThreeBack = document.getElementById('4front')
    drawingCanvasThreeBackBack = document.getElementById('4back')

    drawingCanvasThreeTop = document.getElementById('5front')
    drawingCanvasThreeTopBack = document.getElementById('5back')
    drawingCanvasThreeFront = document.getElementById('6front')
    drawingCanvasThreeFrontBack = document.getElementById('6back')
  }
})
