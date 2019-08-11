<template>
  <div class="tool">
    <div id="containercanvas"></div>
    <div class="container">
      <div>
        <canvas id="drawing-canvas" height="128" width="256"></canvas>
      </div>
    </div>
    <div class="topbuttons">
      <div class>
        <div class="openbttn"></div>
        <div class="contbuttons">
          <ul>
            <li>
              <a id="closebtn" href="javascript:void(0)">Close</a>
            </li>
            <li></li>
            <li>
              <a id="openbtn" href="javascript:void(0)">Open</a>
            </li>
            <li>
              <a id="backClose" href="javascript:void(0)">BACK</a>
            </li>
            <li>
              <a id="frontClose" href="javascript:void(0)">FRONT</a>
            </li>
            <li>
              <a id="leftClose" href="javascript:void(0)">LEFT</a>
            </li>
            <li>
              <a id="rightClose" href="javascript:void(0)">RIGHT</a>
            </li>
            <li>
              <a id="topClose" href="javascript:void(0)">TOP</a>
            </li>
            <li>
              <a id="bottomClose" href="javascript:void(0)">BOTTOM</a>
            </li>
            <li>
              <a id="frontinClose" href="javascript:void(0)">FRONTIN</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="threejs"></div>

    <div id="boxEditor">
      <table>
        <tr>
          <td>
            <table>
              <tr>
                <td>Length:</td>
                <td>
                  <input id="txtLength" type="number" value="100" />
                </td>
              </tr>
              <tr>
                <td>Width:</td>
                <td>
                  <input id="txtWidth" type="number" value="100" />
                </td>
              </tr>
              <tr>
                <td>Depth:</td>
                <td>
                  <input id="txtDepth" type="number" value="100" />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input id="btnUpdateSize" type="button" value="Update" />
                </td>
              </tr>
            </table>
          </td>
          <td>
            <table>
              <tr>
                <td>Change Color:</td>
                <td>
                  <div id="inputColor"></div>
                </td>
              </tr>
            </table>
          </td>
          <td>
            <table>
              <tr>
                <td>Font Family:</td>
                <td>
                  <select id="fontFamily">
                    <option value="arial">Arial</option>
                    <option value="helvetica" selected>Helvetica</option>
                    <option value="myriad pro">Myriad Pro</option>
                    <option value="delicious">Delicious</option>
                    <option value="verdana">Verdana</option>
                    <option value="georgia">Georgia</option>
                    <option value="courier">Courier</option>
                    <option value="comic sans ms">Comic Sans MS</option>
                    <option value="impact">Impact</option>
                    <option value="monaco">Monaco</option>
                    <option value="optima">Optima</option>
                    <option value="hoefler text">Hoefler Text</option>
                    <option value="plaster">Plaster</option>
                    <option value="engagement">Engagement</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Text Color:</td>
                <td>
                  <input type="color" id="fontColor" value="#c91e1e" />
                </td>
              </tr>
              <tr>
                <td>Font Size:</td>
                <td>
                  <input type="range" value="14" min="1" max="120" step="1" id="fontSize" />
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <span style="margin-right: 10px">Origin X:</span>

                    <label>
                      Center
                      <input type="checkbox" id="originX" value="center" checked />
                    </label>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <span style="margin-right: 10px">Origin Y:</span>

                    <label>
                      Center
                      <input type="checkbox" id="originY" value="center" checked />
                    </label>
                  </p>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="button" value="Yazı Ekle" id="btnAddText" />
                </td>
              </tr>
            </table>
          </td>
          <td>
            <table>
              <tr>
                <td>
                  <img src="../images/resim.png" id="my-image" width="100" height="100" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="button" value="Resim Ekle" id="btnAddImage" />
                </td>
                <td></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <router-link tag="a" :to="{name: 'Quote'}">
      <button>Get a Quote</button>
    </router-link>
    <button @click="test">test</button>
  </div>
</template>

<script>
import * as z from '../js/asd.js'
import * as a from '../js/ColladaLoader.js'
import * as b from '../js/SVGLoader.js'
import * as c from '../js/WebGL.js'
import * as e from '../js/index.js'
import * as f from '../js/colorpicker.js'

export default {
  // mounted () {
  //   // console.log(b)
  //   const scripts = document.head.getElementsByTagName('script')
  //   let shouldLoad = true
  //   const url = 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'
  //   for (const script of scripts) {
  //     if (script.src === url) {
  //       shouldLoad = true
  //     }
  //   }
  //   if (shouldLoad) {
  //     let scriptUrls = [url,
  //       'https://threejs.org/build/three.min.js',
  //       'http://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min.js',
  //       'https://s.cdpn.io/25480/OrbitControls.js',
  //       'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.22/fabric.min.js',
  //       'https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js',
  //       '/js/ColladaLoader.js',
  //       '/js/SVGLoader.js',
  //       '/js/WebGL.js',
  //       '/js/index.js',
  //       '/js/colorpicker.js']
  //     for (const scriptUrl of scriptUrls) {
  //       let script = document.createElement('script')
  //       script.setAttribute(
  //         'src',
  //         scriptUrl
  //       )
  //       document.head.appendChild(script)
  //     // script.async = true
  //     // script.defer = true
  //     }
  //   }
  // },
  methods: {
    test () {
      console.log('asd' + a + b + c + e + f + z)
      if (typeof jQuery === 'undefined') {
        console.log('fsdnkfls')
      } else {
        console.log('oki')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"); //url hep global
@import "../styles/toolstyle.scss"; //scss olursa scoped oldugu icin lokal, css olacaksa asagidaki gibi yapmak gerek
@import "../styles/colorpicker.scss";
</style>

<!-- <style scoped src="../styles/css/style.css"></style>
<style scoped src="../styles/css/colorpicker.css"></style> -->
