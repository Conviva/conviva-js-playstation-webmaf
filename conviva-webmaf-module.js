/*! (C) 2020 Conviva, Inc. All rights reserved. Confidential and proprietary. */
!function(a,b){if("function"==typeof define&&define.amd?define(b):"object"==typeof exports&&(module.exports=b()),void 0!==a)if(void 0===a.Conviva){if(void 0!==a.ConvivaModule)return
;if(a.ConvivaModuleLoading)return;a.ConvivaModuleLoading=!0,a.ConvivaModule=b(),delete a.ConvivaModuleLoading}else{if(void 0!==a.Conviva.ProxyMonitor)return;if(a.ConvivaModuleLoading)return;var c=b()
;a.ConvivaModuleLoading=!0,a.Conviva.ProxyMonitor=c.ProxyMonitor,a.Conviva.Impl.WebmafProxy=c.Impl.WebmafProxy,delete a.ConvivaModuleLoading}}(this,function(){var a={};return function(){"use strict"
;!function(){a.ProxyMonitor={_proxyMonitor:null,release:function(){null!=this._proxyMonitor&&this._proxyMonitor.cleanup()},initConvivaDropIn:function(b,c,d,e){var f="No player proxy initialized"
;if(null!==b)return this._proxyMonitor=new a.Impl.WebmafProxy(b,c,d,e),this._proxyMonitor;throw new Error(f)}};a.Impl=a.Impl||{};var b=a.Impl.WebmafProxy=function(a,c,d,e){function f(a,c,d,e){
this._videoAnalytics=d,this._loggingInterface=c.buildLogger(),this._loggingInterface.setModuleName("webmafProxy"),this._log("webmafProxy._constr()"),this._timerInterface=c.buildTimer(),
this._timeInterface=c.buildTime();var f={};f[e.Constants.DeviceMetadata.TYPE]=e.Constants.DeviceType.CONSOLE,f[e.Constants.DeviceMetadata.CATEGORY]=e.Constants.DeviceCategory.PLAYSTATION,
e.Analytics.setDeviceMetadata(f);var g={};g[e.Constants.MODULE_NAME]="WebMAF",g[e.Constants.MODULE_VERSION]=b.version,this._videoAnalytics.setContentInfo(g);var h={}
;h[e.Constants.FRAMEWORK_NAME]="WebMAF",
WM_devSettings&&(WM_devSettings.version&&"string"==typeof WM_devSettings.version&&-1!=WM_devSettings.version.indexOf("-")?h[e.Constants.FRAMEWORK_VERSION]=WM_devSettings.version.slice(1,WM_devSettings.version.indexOf("-")):h[e.Constants.FRAMEWORK_VERSION]=WM_devSettings.version),
this._videoAnalytics.setPlayerInfo(h),this._setupAccessFunction(),this._registerVideoEventListeners(),this._startPolling(),this._pollPlayerState(),this._nativeCommand("getDeviceInfo",{},function(a){
m._onNetworkChange(a)}),this._getScreenResolution()}function g(a){if(a&&null!=a.playerState){m._log("WebmafProxy._onPlayerStateChange()"+a.playerState);var b=m._convertPlayerState(a.playerState)
;b!=e.Constants.PlayerState.UNKNOWN&&m._setPlayerState(b)}}function h(a){a&&null!=a.totalLength&&(m._log("WebmafProxy._onContentAvailable()"+a.totalLength),m._setDuration(a.totalLength))}
function i(a){m._log("WebmafProxy._onPlayerStreamingError()"+a);var b=void 0;if(a&&(null!=a.error&&(b="Error["+a.error+"]"),null!=a.status_code)){var c="ErrorStatusCode["+a.status_code+"]"
;void 0==b?b=c:b+=c}void 0==b&&(b="player_streaming_error_unknown"),m._declareError(b,!0)}function j(a){m._log("WebmafProxy._onPlayerError()"+a);var b=void 0;if(a){
if(null!=a.error&&(b="Error["+a.error+"]"),null!=a.error_code){var c="ErrorCode["+a.error_code+"]";void 0==b?b=c:b+=c}if(null!=a.error_info){var d="ErrorInfo["+a.error_info+"]";void 0==b?b=d:b+=d}
if(-2140536830==a.error_code&&a.error_info.indexOf("sceAvPlayerSetTrickSpeed")>0)return void m._declareError(b,!1)}void 0==b&&(b="player_error_unknown"),m._declareError(b,!0)}function k(a){
if(m._log("WebmafProxy._onNetworkStatusChange()"+a),a&&"ok"==a.status){var b=a.newState
;"disconnected"!=b.toLowerCase()&&"unknown"!=b.toLowerCase()||m._connectionType===b?"connected"==a.newState.toLowerCase()&&m._connectionType!==b?(m._connectionType=a.connectionType,
e.Analytics.reportDeviceMetric(e.Constants.Network.CONNECTION_TYPE,a.connectionType)):a.newState.toLowerCase():(m._connectionType=b,"unknown"==b&&(b="error"),
e.Analytics.reportDeviceMetric(e.Constants.Network.CONNECTION_TYPE,b))}}function l(a){m._log("WebmafProxy._onApplicationStatusChange()"+a),
a&&"ok"==a.status&&("background"===a.applicationStatus?e.Analytics.reportAppBackgrounded():"foreground"===a.applicationStatus&&e.Analytics.reportAppForegrounded())}var m=this
;this._timerInterface=null,this._width=-1,this._height=-1,this._encodedFps=-1,this._renederedFps=-1,this._playerState=e.Constants.PlayerState.UNKNOWN,this._bitrate=0,this._duration=-1,
this.cleanup=function(){this._log("webmafProxy.cleanup()"),this._stopPolling(),this._removeEventListener()},this._registerVideoEventListeners=function(){
m._log("WebmafProxy._registerVideoEventListeners()"),m._addNativeEventListener("playerStatusChange",g),m._addNativeEventListener("contentAvailable",h),
m._addNativeEventListener("playerStreamingError",i),m._addNativeEventListener("playerError",j),m._addNativeEventListener("networkStatusChange",k),
m._addNativeEventListener("applicationStatusChange",l),videometrics.onError=function(a,b){var c=void 0;null!=a&&(c="Error["+a+"]"),null!=b&&(void 0==c?c="ErrorCode["+b+"]":c+="ErrorCode["+b+"]"),
void 0==c&&(c="error_unknown"),m._declareError(c,!0)},videometrics.onBitrateChange=function(a){if(isFinite(a)&&a>0)try{if(videometrics.url){var b=Math.round(a/1e3);m._bitrate!=b&&(m._bitrate=b,
m._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.BITRATE,b,"CONVIVA"))}}catch(c){m._log("Exception while reading videometrics.url: ",c)}}},this._removeEventListener=function(){
m._log("WebmafProxy._removeEventListener()"),m._removeNativeEventListener("playerStatusChange",g),m._removeNativeEventListener("contentAvailable",h),
m._removeNativeEventListener("playerStreamingError",i),m._removeNativeEventListener("playerError",j),m._removeNativeEventListener("networkStatusChange",k),
m._removeNativeEventListener("applicationStatusChange",l)},this._declareError=function(a,b){m._log("WebmafProxy._declareError: code "+a),
m._videoAnalytics.reportPlaybackError(a,b?e.Constants.ErrorSeverity.FATAL:e.Constants.ErrorSeverity.WARNING)},this._onNetworkChange=function(a){
a&&null!=a.connectionType&&m._connectionType!==a.connectionType&&(m._connectionType=a.connectionType,e.Analytics.reportDeviceMetric(e.Constants.Network.CONNECTION_TYPE,a.connectionType))},
this._convertPlayerState=function(a,b){if("string"!=typeof a)return e.Constants.PlayerState.UNKNOWN;if(b&&"playing"===a.toLowerCase())return e.Constants.PlayerState.PLAYING;switch(a.toLowerCase()){
case"opening":case"buffering":return e.Constants.PlayerState.BUFFERING;case"displayingvideo":return e.Constants.PlayerState.PLAYING;case"paused":return e.Constants.PlayerState.PAUSED;case"stopped":
case"endofstream":case"notready":case"unready":case"closed":case"ended":return e.Constants.PlayerState.STOPPED;default:return e.Constants.PlayerState.UNKNOWN}},this._setPlayerState=function(a){
m._playerState!==a&&(m._log("WebmafProxy._setPlayerState(): "+a),m._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.PLAYER_STATE,a,"CONVIVA"),m._playerState=a)},this._setDuration=function(a){
if(m._log("WebmafProxy._setDuration()"),m._playerState==e.Constants.PlayerState.PLAYING&&isFinite(a)&&m._duration!=a){m._duration=a;var b={};m._duration>0?(b[e.Constants.DURATION]=m._duration,
b[e.Constants.IS_LIVE]=e.Constants.StreamType.VOD):0===m._duration&&(b[e.Constants.IS_LIVE]=e.Constants.StreamType.LIVE),m._videoAnalytics.setContentInfo(b)}},this._startPolling=function(){
this._pollingTimerCancel=this._timerInterface.createTimer(this._poll,1e3,"webmafProxy._poll()")},this._poll=function(){if(m._videoAnalytics.getAdType()!==e.Constants.AdType.CLIENT_SIDE){
if(videometrics&&"null"!==videometrics&&"undefined"!==videometrics){if(m._videoHeight==videometrics.naturalHeight&&m._videoWidth==videometrics.naturalWidth||(m._videoWidth=videometrics.naturalWidth,
m._videoHeight=videometrics.naturalHeight,m._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.RESOLUTION,videometrics.naturalWidth,videometrics.naturalHeight,"CONVIVA")),
m._encodedFps!=videometrics.encodedFramerate){m._encodedFps=videometrics.encodedFramerate;var a={};a[e.Constants.ENCODED_FRAMERATE]=m._encodedFps,m._videoAnalytics.setContentInfo(a)}
m._renederedFps!=videometrics.renderedFramerate&&(m._renederedFps=videometrics.renderedFramerate,
m._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.RENDERED_FRAMERATE,videometrics.renderedFramerate,"CONVIVA")),
m._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.PLAY_HEAD_TIME,videometrics.elapsed,"CONVIVA"),m._setDuration(videometrics.duration/1e3),m._pollBitrate(),videometrics.poll()}
}else m._playerState!=e.Constants.PlayerState.UNKNOWN&&(m._playerState=e.Constants.PlayerState.UNKNOWN)},this._pollBitrate=function(){var a=videometrics.currentBitrate;if(isFinite(a)&&a>0)try{
if(videometrics.url){var b=Math.round(a/1e3);m._bitrate!=b&&(m._bitrate=b,m._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.BITRATE,b,"CONVIVA"))}}catch(c){
m._log("Exception while reading videometrics.url: ",c)}},this._pollPlayerState=function(){m._log("videometrics.currentState "+videometrics.currentState)
;var a=m._convertPlayerState(videometrics.currentState);a!=e.Constants.PlayerState.UNKNOWN&&m._setPlayerState(a)},this._stopPolling=function(){
null!=this._pollingTimerCancel&&this._pollingTimerCancel()},this._log=function(a){this._loggingInterface.log(a,e.SystemSettings.LogLevel.DEBUG)},this._nativeCommand=function(a,b,c){
m._nativeCallbacks||(m._nativeCallbacks={});var d;(d=m._nativeCallbacks[a])||(d=m._nativeCallbacks[a]=[]),c&&d.push(c);var e={command:a};if(b)for(var f in b)e[f]=b[f];var g=m.jsonEncode(e)
;"getPlaybackTime"!==a&&m._safeLog("[nativeCommand] "+g),window.external&&window.external.user&&window.external.user(g)},this._addNativeEventListener=function(a,b){
m._nativeCallbacks||(m._nativeCallbacks={});var c;(c=m._nativeCallbacks[a])?m._removeNativeEventListener(a,b):c=m._nativeCallbacks[a]=[],c.push(b)},this._removeNativeEventListener=function(a,b){
m._nativeCallbacks||(m._nativeCallbacks={});var c=m._nativeCallbacks[a];if(c)for(var d=0;d<c.length;d++)if(c[d]==b)return void c.splice(d,1)},this._nativeCallback=function(a){var b=null;try{
b=m.jsonDecode(a)}catch(f){b=m.jsonDecode(a.replace("}",'"}'))}if(null!=b){var c=b.command;"getPlaybackTime"!==c&&m._safeLog("[WebmafProxy::nativeCallback] "+a),
m._nativeCallbacks||(m._nativeCallbacks={});var d=m._nativeCallbacks[c];if(d&&d.length>0)switch(c){case"networkStatusChange":case"contentAvailable":case"playerStatusChange":case"playerError":
case"playerMessage":case"playerStreamingError":case"applicationStatusChange":for(var e=0;e<d.length;e++)d[e](b);break;default:d.shift(1)(b)}}},this.jsonEncode=function(a){return JSON.stringify(a)},
this.jsonDecode=function(a){return JSON.parse(a)},this._safeLog=function(a){a="["+((new Date).getTime()/1e3).toFixed(3).toString()+"] "+a,m._log(a)},this._accessfunction=function(a){
m._savedAccessFunction&&m._savedAccessFunction(a),m._nativeCallback(a)},this._setupAccessFunction=function(){"function"==typeof window.accessfunction&&(m._savedAccessFunction=window.accessfunction),
window.accessfunction=m._accessfunction},this._restoreAccessFunction=function(){m._savedAccessFunction?window.accessfunction=m._savedAccessFunction:window.accessfunction=null},
this._getScreenResolution=function(){m._nativeCommand("getScreenResolution",{},function(a){m._onScreenResolution(a)})},this._onScreenResolution=function(a){var b={}
;b[e.Constants.DeviceMetadata.SCREEN_RESOLUTION_WIDTH]=a.width,b[e.Constants.DeviceMetadata.SCREEN_RESOLUTION_HEIGHT]=a.height,b[e.Constants.DeviceMetadata.SCREEN_RESOLUTION_SCALE_FACTOR]=1,
e.Analytics.setDeviceMetadata(b)},f.apply(this,arguments)};b.version="4.0.2","undefined"!=typeof Conviva&&function(){var a,b=function(a){return JSON.stringify(a)},c=function(a){return JSON.parse(a)
},d={command:"getScreenResolution"};"function"==typeof window.accessfunction&&(a=window.accessfunction),window.accessfunction=function(b){var d=null;try{d=c(b)}catch(f){d=c(b.replace("}",'"}'))}
if(null!=d){if("getScreenResolution"==d.command){var e={};e[Conviva.Constants.DeviceMetadata.SCREEN_RESOLUTION_WIDTH]=d.width,e[Conviva.Constants.DeviceMetadata.SCREEN_RESOLUTION_HEIGHT]=d.height,
e[Conviva.Constants.DeviceMetadata.SCREEN_RESOLUTION_SCALE_FACTOR]=1,Conviva.Analytics.setDeviceMetadata(e)}}a&&a(b)};var e=b(d);window.external&&window.external.user&&window.external.user(e)}()}()
}(),a});