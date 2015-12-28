/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/**
 * @license RequireJS text 2.0.7 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

/**
 * Durandal 2.1.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
 * Available via the MIT license.
 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
 */

/*! pace 1.0.0 */

//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

!function () {
    var requirejs, require, define;
    !function (global) {
        function isFunction(e) {
            return "[object Function]" === ostring.call(e)
        }

        function isArray(e) {
            return "[object Array]" === ostring.call(e)
        }

        function each(e, t) {
            if (e) {
                var n;
                for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
            }
        }

        function eachReverse(e, t) {
            if (e) {
                var n;
                for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
            }
        }

        function hasProp(e, t) {
            return hasOwn.call(e, t)
        }

        function getOwn(e, t) {
            return hasProp(e, t) && e[t]
        }

        function eachProp(e, t) {
            var n;
            for (n in e)if (hasProp(e, n) && t(e[n], n))break
        }

        function mixin(e, t, n, r) {
            return t && eachProp(t, function (t, i) {
                (n || !hasProp(e, i)) && (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[i] = t : (e[i] || (e[i] = {}), mixin(e[i], t, n, r)))
            }), e
        }

        function bind(e, t) {
            return function () {
                return t.apply(e, arguments)
            }
        }

        function scripts() {
            return document.getElementsByTagName("script")
        }

        function defaultOnError(e) {
            throw e
        }

        function getGlobal(e) {
            if (!e)return e;
            var t = global;
            return each(e.split("."), function (e) {
                t = t[e]
            }), t
        }

        function makeError(e, t, n, r) {
            var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
            return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
        }

        function newContext(e) {
            function t(e) {
                var t, n, r = e.length;
                for (t = 0; r > t; t++)if (n = e[t], "." === n)e.splice(t, 1), t -= 1; else if (".." === n) {
                    if (1 === t && (".." === e[2] || ".." === e[0]))break;
                    t > 0 && (e.splice(t - 1, 2), t -= 2)
                }
            }

            function n(e, n, r) {
                var i, a, o, s, u, c, l, d, f, p, h, m = n && n.split("/"), g = m, v = D.map, y = v && v["*"];
                if (e && "." === e.charAt(0) && (n ? (g = m.slice(0, m.length - 1), e = e.split("/"), l = e.length - 1, D.nodeIdCompat && jsSuffixRegExp.test(e[l]) && (e[l] = e[l].replace(jsSuffixRegExp, "")), e = g.concat(e), t(e), e = e.join("/")) : 0 === e.indexOf("./") && (e = e.substring(2))), r && v && (m || y)) {
                    o = e.split("/");
                    e:for (s = o.length; s > 0; s -= 1) {
                        if (c = o.slice(0, s).join("/"), m)for (u = m.length; u > 0; u -= 1)if (a = getOwn(v, m.slice(0, u).join("/")), a && (a = getOwn(a, c))) {
                            d = a, f = s;
                            break e
                        }
                        !p && y && getOwn(y, c) && (p = getOwn(y, c), h = s)
                    }
                    !d && p && (d = p, f = h), d && (o.splice(0, f, d), e = o.join("/"))
                }
                return i = getOwn(D.pkgs, e), i ? i : e
            }

            function r(e) {
                isBrowser && each(scripts(), function (t) {
                    return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === w.contextName ? (t.parentNode.removeChild(t), !0) : void 0
                })
            }

            function i(e) {
                var t = getOwn(D.paths, e);
                return t && isArray(t) && t.length > 1 ? (t.shift(), w.require.undef(e), w.require([e]), !0) : void 0
            }

            function a(e) {
                var t, n = e ? e.indexOf("!") : -1;
                return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
            }

            function o(e, t, r, i) {
                var o, s, u, c, l = null, d = t ? t.name : null, f = e, p = !0, h = "";
                return e || (p = !1, e = "_@r" + (j += 1)), c = a(e), l = c[0], e = c[1], l && (l = n(l, d, i), s = getOwn(A, l)), e && (l ? h = s && s.normalize ? s.normalize(e, function (e) {
                    return n(e, d, i)
                }) : n(e, d, i) : (h = n(e, d, i), c = a(h), l = c[0], h = c[1], r = !0, o = w.nameToUrl(h))), u = !l || s || r ? "" : "_unnormalized" + (E += 1), {
                    prefix: l,
                    name: h,
                    parentMap: t,
                    unnormalized: !!u,
                    url: o,
                    originalName: f,
                    isDefine: p,
                    id: (l ? l + "!" + h : h) + u
                }
            }

            function s(e) {
                var t = e.id, n = getOwn(R, t);
                return n || (n = R[t] = new w.Module(e)), n
            }

            function u(e, t, n) {
                var r = e.id, i = getOwn(R, r);
                !hasProp(A, r) || i && !i.defineEmitComplete ? (i = s(e), i.error && "error" === t ? n(i.error) : i.on(t, n)) : "defined" === t && n(A[r])
            }

            function c(e, t) {
                var n = e.requireModules, r = !1;
                t ? t(e) : (each(n, function (t) {
                    var n = getOwn(R, t);
                    n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
                }), r || req.onError(e))
            }

            function l() {
                globalDefQueue.length && (apsp.apply(M, [M.length, 0].concat(globalDefQueue)), globalDefQueue = [])
            }

            function d(e) {
                delete R[e], delete k[e]
            }

            function f(e, t, n) {
                var r = e.map.id;
                e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, i) {
                    var a = r.id, o = getOwn(R, a);
                    !o || e.depMatched[i] || n[a] || (getOwn(t, a) ? (e.defineDep(i, A[a]), e.check()) : f(o, t, n))
                }), n[r] = !0)
            }

            function p() {
                var e, t, n = 1e3 * D.waitSeconds, a = n && w.startTime + n < (new Date).getTime(), o = [], s = [], u = !1, l = !0;
                if (!y) {
                    if (y = !0, eachProp(k, function (e) {
                            var n = e.map, c = n.id;
                            if (e.enabled && (n.isDefine || s.push(e), !e.error))if (!e.inited && a)i(c) ? (t = !0, u = !0) : (o.push(c), r(c)); else if (!e.inited && e.fetched && n.isDefine && (u = !0, !n.prefix))return l = !1
                        }), a && o.length)return e = makeError("timeout", "Load timeout for modules: " + o, null, o), e.contextName = w.contextName, c(e);
                    l && each(s, function (e) {
                        f(e, {}, {})
                    }), a && !t || !u || !isBrowser && !isWebWorker || S || (S = setTimeout(function () {
                        S = 0, p()
                    }, 50)), y = !1
                }
            }

            function h(e) {
                hasProp(A, e[0]) || s(o(e[0], null, !0)).init(e[1], e[2])
            }

            function m(e, t, n, r) {
                e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
            }

            function g(e) {
                var t = e.currentTarget || e.srcElement;
                return m(t, w.onScriptLoad, "load", "onreadystatechange"), m(t, w.onScriptError, "error"), {
                    node: t,
                    id: t && t.getAttribute("data-requiremodule")
                }
            }

            function v() {
                var e;
                for (l(); M.length;) {
                    if (e = M.shift(), null === e[0])return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                    h(e)
                }
            }

            var y, b, w, x, S, D = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            }, R = {}, k = {}, C = {}, M = [], A = {}, O = {}, T = {}, j = 1, E = 1;
            return x = {
                require: function (e) {
                    return e.require ? e.require : e.require = w.makeRequire(e.map)
                }, exports: function (e) {
                    return e.usingExports = !0, e.map.isDefine ? e.exports ? A[e.map.id] = e.exports : e.exports = A[e.map.id] = {} : void 0
                }, module: function (e) {
                    return e.module ? e.module : e.module = {
                        id: e.map.id, uri: e.map.url, config: function () {
                            return getOwn(D.config, e.map.id) || {}
                        }, exports: e.exports || (e.exports = {})
                    }
                }
            }, b = function (e) {
                this.events = getOwn(C, e.id) || {}, this.map = e, this.shim = getOwn(D.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
            }, b.prototype = {
                init: function (e, t, n, r) {
                    r = r || {}, this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function (e) {
                        this.emit("error", e)
                    })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
                }, defineDep: function (e, t) {
                    this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
                }, fetch: function () {
                    if (!this.fetched) {
                        this.fetched = !0, w.startTime = (new Date).getTime();
                        var e = this.map;
                        return this.shim ? void w.makeRequire(this.map, {enableBuildCallback: !0})(this.shim.deps || [], bind(this, function () {
                            return e.prefix ? this.callPlugin() : this.load()
                        })) : e.prefix ? this.callPlugin() : this.load()
                    }
                }, load: function () {
                    var e = this.map.url;
                    O[e] || (O[e] = !0, w.load(this.map.id, e))
                }, check: function () {
                    if (this.enabled && !this.enabling) {
                        var e, t, n = this.map.id, r = this.depExports, i = this.exports, a = this.factory;
                        if (this.inited) {
                            if (this.error)this.emit("error", this.error); else if (!this.defining) {
                                if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                    if (isFunction(a)) {
                                        if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)try {
                                            i = w.execCb(n, a, r, i)
                                        } catch (o) {
                                            e = o
                                        } else i = w.execCb(n, a, r, i);
                                        if (this.map.isDefine && void 0 === i && (t = this.module, t ? i = t.exports : this.usingExports && (i = this.exports)), e)return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", c(this.error = e)
                                    } else i = a;
                                    this.exports = i, this.map.isDefine && !this.ignore && (A[n] = i, req.onResourceLoad && req.onResourceLoad(w, this.map, this.depMaps)), d(n), this.defined = !0
                                }
                                this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                            }
                        } else this.fetch()
                    }
                }, callPlugin: function () {
                    var e = this.map, t = e.id, r = o(e.prefix);
                    this.depMaps.push(r), u(r, "defined", bind(this, function (r) {
                        var i, a, l, f = getOwn(T, this.map.id), p = this.map.name, h = this.map.parentMap ? this.map.parentMap.name : null, m = w.makeRequire(e.parentMap, {enableBuildCallback: !0});
                        return this.map.unnormalized ? (r.normalize && (p = r.normalize(p, function (e) {
                                return n(e, h, !0)
                            }) || ""), a = o(e.prefix + "!" + p, this.map.parentMap), u(a, "defined", bind(this, function (e) {
                            this.init([], function () {
                                return e
                            }, null, {enabled: !0, ignore: !0})
                        })), l = getOwn(R, a.id), void(l && (this.depMaps.push(a), this.events.error && l.on("error", bind(this, function (e) {
                            this.emit("error", e)
                        })), l.enable()))) : f ? (this.map.url = w.nameToUrl(f), void this.load()) : (i = bind(this, function (e) {
                            this.init([], function () {
                                return e
                            }, null, {enabled: !0})
                        }), i.error = bind(this, function (e) {
                            this.inited = !0, this.error = e, e.requireModules = [t], eachProp(R, function (e) {
                                0 === e.map.id.indexOf(t + "_unnormalized") && d(e.map.id)
                            }), c(e)
                        }), i.fromText = bind(this, function (n, r) {
                            var a = e.name, u = o(a), l = useInteractive;
                            r && (n = r), l && (useInteractive = !1), s(u), hasProp(D.config, t) && (D.config[a] = D.config[t]);
                            try {
                                req.exec(n)
                            } catch (d) {
                                return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + d, d, [t]))
                            }
                            l && (useInteractive = !0), this.depMaps.push(u), w.completeLoad(a), m([a], i)
                        }), void r.load(e.name, m, i, D))
                    })), w.enable(r, this), this.pluginMaps[r.id] = r
                }, enable: function () {
                    k[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
                        var n, r, i;
                        if ("string" == typeof e) {
                            if (e = o(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, i = getOwn(x, e.id))return void(this.depExports[t] = i(this));
                            this.depCount += 1, u(e, "defined", bind(this, function (e) {
                                this.defineDep(t, e), this.check()
                            })), this.errback && u(e, "error", bind(this, this.errback))
                        }
                        n = e.id, r = R[n], hasProp(x, n) || !r || r.enabled || w.enable(e, this)
                    })), eachProp(this.pluginMaps, bind(this, function (e) {
                        var t = getOwn(R, e.id);
                        t && !t.enabled && w.enable(e, this)
                    })), this.enabling = !1, this.check()
                }, on: function (e, t) {
                    var n = this.events[e];
                    n || (n = this.events[e] = []), n.push(t)
                }, emit: function (e, t) {
                    each(this.events[e], function (e) {
                        e(t)
                    }), "error" === e && delete this.events[e]
                }
            }, w = {
                config: D,
                contextName: e,
                registry: R,
                defined: A,
                urlFetched: O,
                defQueue: M,
                Module: b,
                makeModuleMap: o,
                nextTick: req.nextTick,
                onError: c,
                configure: function (e) {
                    e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
                    var t = D.shim, n = {paths: !0, bundles: !0, config: !0, map: !0};
                    eachProp(e, function (e, t) {
                        n[t] ? (D[t] || (D[t] = {}), mixin(D[t], e, !0, !0)) : D[t] = e
                    }), e.bundles && eachProp(e.bundles, function (e, t) {
                        each(e, function (e) {
                            e !== t && (T[e] = t)
                        })
                    }), e.shim && (eachProp(e.shim, function (e, n) {
                        isArray(e) && (e = {deps: e}), !e.exports && !e.init || e.exportsFn || (e.exportsFn = w.makeShimExports(e)), t[n] = e
                    }), D.shim = t), e.packages && each(e.packages, function (e) {
                        var t, n;
                        e = "string" == typeof e ? {name: e} : e, n = e.name, t = e.location, t && (D.paths[n] = e.location), D.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                    }), eachProp(R, function (e, t) {
                        e.inited || e.map.unnormalized || (e.map = o(t))
                    }), (e.deps || e.callback) && w.require(e.deps || [], e.callback)
                },
                makeShimExports: function (e) {
                    function t() {
                        var t;
                        return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                    }

                    return t
                },
                makeRequire: function (t, i) {
                    function a(n, r, u) {
                        var l, d, f;
                        return i.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof n ? isFunction(r) ? c(makeError("requireargs", "Invalid require call"), u) : t && hasProp(x, n) ? x[n](R[t.id]) : req.get ? req.get(w, n, t, a) : (d = o(n, t, !1, !0), l = d.id, hasProp(A, l) ? A[l] : c(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), w.nextTick(function () {
                            v(), f = s(o(null, t)), f.skipMap = i.skipMap, f.init(n, r, u, {enabled: !0}), p()
                        }), a)
                    }

                    return i = i || {}, mixin(a, {
                        isBrowser: isBrowser, toUrl: function (e) {
                            var r, i = e.lastIndexOf("."), a = e.split("/")[0], o = "." === a || ".." === a;
                            return -1 !== i && (!o || i > 1) && (r = e.substring(i, e.length), e = e.substring(0, i)), w.nameToUrl(n(e, t && t.id, !0), r, !0)
                        }, defined: function (e) {
                            return hasProp(A, o(e, t, !1, !0).id)
                        }, specified: function (e) {
                            return e = o(e, t, !1, !0).id, hasProp(A, e) || hasProp(R, e)
                        }
                    }), t || (a.undef = function (e) {
                        l();
                        var n = o(e, t, !0), i = getOwn(R, e);
                        r(e), delete A[e], delete O[n.url], delete C[e], eachReverse(M, function (t, n) {
                            t[0] === e && M.splice(n, 1)
                        }), i && (i.events.defined && (C[e] = i.events), d(e))
                    }), a
                },
                enable: function (e) {
                    var t = getOwn(R, e.id);
                    t && s(e).enable()
                },
                completeLoad: function (e) {
                    var t, n, r, a = getOwn(D.shim, e) || {}, o = a.exports;
                    for (l(); M.length;) {
                        if (n = M.shift(), null === n[0]) {
                            if (n[0] = e, t)break;
                            t = !0
                        } else n[0] === e && (t = !0);
                        h(n)
                    }
                    if (r = getOwn(R, e), !t && !hasProp(A, e) && r && !r.inited) {
                        if (!(!D.enforceDefine || o && getGlobal(o)))return i(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
                        h([e, a.deps || [], a.exportsFn])
                    }
                    p()
                },
                nameToUrl: function (e, t, n) {
                    var r, i, a, o, s, u, c, l = getOwn(D.pkgs, e);
                    if (l && (e = l), c = getOwn(T, e))return w.nameToUrl(c, t, n);
                    if (req.jsExtRegExp.test(e))s = e + (t || ""); else {
                        for (r = D.paths, i = e.split("/"), a = i.length; a > 0; a -= 1)if (o = i.slice(0, a).join("/"), u = getOwn(r, o)) {
                            isArray(u) && (u = u[0]), i.splice(0, a, u);
                            break
                        }
                        s = i.join("/"), s += t || (/^data\:|\?/.test(s) || n ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : D.baseUrl) + s
                    }
                    return D.urlArgs ? s + ((-1 === s.indexOf("?") ? "?" : "&") + D.urlArgs) : s
                },
                load: function (e, t) {
                    req.load(w, e, t)
                },
                execCb: function (e, t, n, r) {
                    return t.apply(r, n)
                },
                onScriptLoad: function (e) {
                    if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                        interactiveScript = null;
                        var t = g(e);
                        w.completeLoad(t.id)
                    }
                },
                onScriptError: function (e) {
                    var t = g(e);
                    return i(t.id) ? void 0 : c(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
                }
            }, w.require = w.makeRequire(), w
        }

        function getInteractiveScript() {
            return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (e) {
                return "interactive" === e.readyState ? interactiveScript = e : void 0
            }), interactiveScript)
        }

        var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.11", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
        if ("undefined" == typeof define) {
            if ("undefined" != typeof requirejs) {
                if (isFunction(requirejs))return;
                cfg = requirejs, requirejs = void 0
            }
            "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (e, t, n, r) {
                var i, a, o = defContextName;
                return isArray(e) || "string" == typeof e || (a = e, isArray(t) ? (e = t, t = n, n = r) : e = []), a && a.context && (o = a.context), i = getOwn(contexts, o), i || (i = contexts[o] = req.s.newContext(o)), a && i.configure(a), i.require(e, t, n)
            }, req.config = function (e) {
                return req(e)
            }, req.nextTick = "undefined" != typeof setTimeout ? function (e) {
                setTimeout(e, 4)
            } : function (e) {
                e()
            }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
                contexts: contexts,
                newContext: newContext
            }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) {
                req[e] = function () {
                    var t = contexts[defContextName];
                    return t.require[e].apply(t, arguments)
                }
            }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e) {
                var t = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
                return t.type = e.scriptType || "text/javascript", t.charset = "utf-8", t.async = !0, t
            }, req.load = function (e, t, n) {
                var r, i = e && e.config || {};
                if (isBrowser)return r = req.createNode(i, t, n), r.setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = n, currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
                if (isWebWorker)try {
                    importScripts(n), e.completeLoad(t)
                } catch (a) {
                    e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, a, [t]))
                }
            }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) {
                return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
            }), define = function (e, t, n) {
                var r, i;
                "string" != typeof e && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (e, n) {
                    t.push(n)
                }), t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
            }, define.amd = {jQuery: !0}, req.exec = function (text) {
                return eval(text)
            }, req(cfg)
        }
    }(this), define("requireLib", function () {
    }), define("text", ["module"], function (e) {
        var t, n, r, i, a = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], o = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, s = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, u = "undefined" != typeof location && location.href, c = u && location.protocol && location.protocol.replace(/\:/, ""), l = u && location.hostname, d = u && (location.port || void 0), f = {}, p = e.config && e.config() || {};
        return t = {
            version: "2.0.7", strip: function (e) {
                if (e) {
                    e = e.replace(o, "");
                    var t = e.match(s);
                    t && (e = t[1])
                } else e = "";
                return e
            }, jsEscape: function (e) {
                return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
            }, createXhr: p.createXhr || function () {
                var e, t, n;
                if ("undefined" != typeof XMLHttpRequest)return new XMLHttpRequest;
                if ("undefined" != typeof ActiveXObject)for (t = 0; 3 > t; t += 1) {
                    n = a[t];
                    try {
                        e = new ActiveXObject(n)
                    } catch (r) {
                    }
                    if (e) {
                        a = [n];
                        break
                    }
                }
                return e
            }, parseName: function (e) {
                var t, n, r, i = !1, a = e.indexOf("."), o = 0 === e.indexOf("./") || 0 === e.indexOf("../");
                return -1 !== a && (!o || a > 1) ? (t = e.substring(0, a), n = e.substring(a + 1, e.length)) : t = e, r = n || t, a = r.indexOf("!"), -1 !== a && (i = "strip" === r.substring(a + 1), r = r.substring(0, a), n ? n = r : t = r), {
                    moduleName: t,
                    ext: n,
                    strip: i
                }
            }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function (e, n, r, i) {
                var a, o, s, u = t.xdRegExp.exec(e);
                return u ? (a = u[2], o = u[3], o = o.split(":"), s = o[1], o = o[0], !(a && a !== n || o && o.toLowerCase() !== r.toLowerCase() || (s || o) && s !== i)) : !0
            }, finishLoad: function (e, n, r, i) {
                r = n ? t.strip(r) : r, p.isBuild && (f[e] = r), i(r)
            }, load: function (e, n, r, i) {
                if (i.isBuild && !i.inlineText)return void r();
                p.isBuild = i.isBuild;
                var a = t.parseName(e), o = a.moduleName + (a.ext ? "." + a.ext : ""), s = n.toUrl(o), f = p.useXhr || t.useXhr;
                !u || f(s, c, l, d) ? t.get(s, function (n) {
                    t.finishLoad(e, a.strip, n, r)
                }, function (e) {
                    r.error && r.error(e)
                }) : n([o], function (e) {
                    t.finishLoad(a.moduleName + "." + a.ext, a.strip, e, r)
                })
            }, write: function (e, n, r) {
                if (f.hasOwnProperty(n)) {
                    var i = t.jsEscape(f[n]);
                    r.asModule(e + "!" + n, "define(function () { return '" + i + "';});\n")
                }
            }, writeFile: function (e, n, r, i, a) {
                var o = t.parseName(n), s = o.ext ? "." + o.ext : "", u = o.moduleName + s, c = r.toUrl(o.moduleName + s) + ".js";
                t.load(u, r, function () {
                    var n = function (e) {
                        return i(c, e)
                    };
                    n.asModule = function (e, t) {
                        return i.asModule(e, c, t)
                    }, t.write(e, u, n, a)
                }, a)
            }
        }, "node" === p.env || !p.env && "undefined" != typeof process && process.versions && process.versions.node ? (n = require.nodeRequire("fs"), t.get = function (e, t, r) {
            try {
                var i = n.readFileSync(e, "utf8");
                0 === i.indexOf("?") && (i = i.substring(1)), t(i)
            } catch (a) {
                r(a)
            }
        }) : "xhr" === p.env || !p.env && t.createXhr() ? t.get = function (e, n, r, i) {
            var a, o = t.createXhr();
            if (o.open("GET", e, !0), i)for (a in i)i.hasOwnProperty(a) && o.setRequestHeader(a.toLowerCase(), i[a]);
            p.onXhr && p.onXhr(o, e), o.onreadystatechange = function () {
                var t, i;
                4 === o.readyState && (t = o.status, t > 399 && 600 > t ? (i = new Error(e + " HTTP status: " + t), i.xhr = o, r(i)) : n(o.responseText), p.onXhrComplete && p.onXhrComplete(o, e))
            }, o.send(null)
        } : "rhino" === p.env || !p.env && "undefined" != typeof Packages && "undefined" != typeof java ? t.get = function (e, t) {
            var n, r, i = "utf-8", a = new java.io.File(e), o = java.lang.System.getProperty("line.separator"), s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(a), i)), u = "";
            try {
                for (n = new java.lang.StringBuffer, r = s.readLine(), r && r.length() && 65279 === r.charAt(0) && (r = r.substring(1)), null !== r && n.append(r); null !== (r = s.readLine());)n.append(o), n.append(r);
                u = String(n.toString())
            } finally {
                s.close()
            }
            t(u)
        } : ("xpconnect" === p.env || !p.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (r = Components.classes, i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), t.get = function (e, t) {
            var n, a, o = {}, s = new FileUtils.File(e);
            try {
                n = r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), n.init(s, 1, 0, !1), a = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), a.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), a.readString(n.available(), o), a.close(), n.close(), t(o.value)
            } catch (u) {
                throw new Error((s && s.path || "") + ": " + u)
            }
        }), t
    }), require.config({
        baseUrl: "monitor-lite-spa",
        paths: {
            jquery: ["//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min", "../lib/jQuery/jquery-2.1.3.min"],
            bootstrap: ["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min", "../lib/bootstrap/bootstrap.min"],
            knockout: ["//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min", "../lib/knockout/knockout-3.2.0"],
            komapping: ["//cdnjs.cloudflare.com/ajax/libs/knockout.mapping/2.4.1/knockout.mapping.min", "../lib/knockout.mapping-latest"],
            openLayers: ["//cdnjs.cloudflare.com/ajax/libs/ol3/3.4.0/ol.min", "../lib/openlayers/ol"],
            moment: ["//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment"],
            flot: ["//cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.min", "../lib/jQuery.flot/jQuery.flot.min"],
            flotResize: ["//cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.resize.min", "../lib/jQuery.flot/jQuery.flot.resize.min"],
            flotTime: ["//cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.time.min", "../lib/jQuery.flot/jQuery.flot.time.min"],
            flotArrows: "../lib/jQuery.flot/jquery.flot.symbol.arrows",
            numeral: ["//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min"],
            text: "../lib/require/text",
            plugins: "../lib/durandal/plugins",
            durandal: "../lib/durandal",
            models: "../App/models",
            transitions: "../lib/durandal/transitions",
            maphilight: "../lib/jQuery/jquery.maphilight.min",
            pace: "../lib/pace/pace.min",
            underscore: "../lib/underscore/underscore-min",
            typeahead: "../lib/typeahead/typeahead.jquery.min"
        },
        shim: {
            jquery: {exports: "jQuery"},
            knockout: {exports: "ko"},
            komapping: {deps: ["knockout"], exports: "ko.mapping"},
            openLayers: {exports: "ol"},
            moment: {exports: "moment"},
            bootstrap: {deps: ["jquery"]},
            flotResize: {deps: ["flot"], exports: "flotResize"},
            flotTime: {deps: ["flot"], exports: "flotTime"},
            flotArrows: {deps: ["flot"], exports: "flotArrows"},
            numeral: {exports: "numeral"},
            main: {deps: ["jquery", "knockout", "komapping", "openLayers", "moment", "bootstrap", "numeral"]}
        }
    }), define("main-release", function () {
    }), define("durandal/system", ["require", "jquery"], function (e, t) {
        function n(e) {
            var t = "[object " + e + "]";
            r["is" + e] = function (e) {
                return s.call(e) == t
            }
        }

        var r, i = !1, a = Object.keys, o = Object.prototype.hasOwnProperty, s = Object.prototype.toString, u = !1, c = Array.isArray, l = Array.prototype.slice;
        if (String.prototype.trim || (String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g, "")
            }), Function.prototype.bind && ("object" == typeof console || "function" == typeof console) && "object" == typeof console.log)try {
            ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function (e) {
                console[e] = this.call(console[e], console)
            }, Function.prototype.bind)
        } catch (d) {
            u = !0
        }
        e.on && e.on("moduleLoaded", function (e, t) {
            r.setModuleId(e, t)
        }), "undefined" != typeof requirejs && (requirejs.onResourceLoad = function (e, t) {
            r.setModuleId(e.defined[t.id], t.id)
        });
        var f = function () {
        }, p = function () {
            try {
                if ("undefined" != typeof console && "function" == typeof console.log)if (window.opera)for (var e = 0; e < arguments.length;)console.log("Item " + (e + 1) + ": " + arguments[e]), e++; else 1 == l.call(arguments).length && "string" == typeof l.call(arguments)[0] ? console.log(l.call(arguments).toString()) : console.log.apply(console, l.call(arguments)); else Function.prototype.bind && !u || "undefined" == typeof console || "object" != typeof console.log || Function.prototype.call.call(console.log, console, l.call(arguments))
            } catch (t) {
            }
        }, h = function (e, t) {
            var n;
            n = e instanceof Error ? e : new Error(e), n.innerError = t;
            try {
                "undefined" != typeof console && "function" == typeof console.error ? console.error(n) : Function.prototype.bind && !u || "undefined" == typeof console || "object" != typeof console.error || Function.prototype.call.call(console.error, console, n)
            } catch (r) {
            }
            throw n
        };
        r = {
            version: "2.1.0", noop: f, getModuleId: function (e) {
                return e ? "function" == typeof e && e.prototype ? e.prototype.__moduleId__ : "string" == typeof e ? null : e.__moduleId__ : null
            }, setModuleId: function (e, t) {
                return e ? "function" == typeof e && e.prototype ? void(e.prototype.__moduleId__ = t) : void("string" != typeof e && (e.__moduleId__ = t)) : void 0
            }, resolveObject: function (e) {
                return r.isFunction(e) ? new e : e
            }, debug: function (e) {
                return 1 == arguments.length && (i = e, i ? (this.log = p, this.error = h, this.log("Debug:Enabled")) : (this.log("Debug:Disabled"), this.log = f, this.error = f)), i
            }, log: f, error: f, assert: function (e, t) {
                e || r.error(new Error(t || "Assert:Failed"))
            }, defer: function (e) {
                return t.Deferred(e)
            }, guid: function () {
                var e = (new Date).getTime();
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
                    var n = (e + 16 * Math.random()) % 16 | 0;
                    return e = Math.floor(e / 16), ("x" == t ? n : 7 & n | 8).toString(16)
                })
            }, acquire: function () {
                var t, n = arguments[0], i = !1;
                return r.isArray(n) ? (t = n, i = !0) : t = l.call(arguments, 0), this.defer(function (n) {
                    e(t, function () {
                        var e = arguments;
                        setTimeout(function () {
                            n.resolve(e.length > 1 || i ? l.call(e, 0) : e[0])
                        }, 1)
                    }, function (e) {
                        n.reject(e)
                    })
                }).promise()
            }, extend: function (e) {
                for (var t = l.call(arguments, 1), n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (r)for (var i in r)e[i] = r[i]
                }
                return e
            }, wait: function (e) {
                return r.defer(function (t) {
                    setTimeout(t.resolve, e)
                }).promise()
            }
        }, r.keys = a || function (e) {
                if (e !== Object(e))throw new TypeError("Invalid object");
                var t = [];
                for (var n in e)o.call(e, n) && (t[t.length] = n);
                return t
            }, r.isElement = function (e) {
            return !(!e || 1 !== e.nodeType)
        }, r.isArray = c || function (e) {
                return "[object Array]" == s.call(e)
            }, r.isObject = function (e) {
            return e === Object(e)
        }, r.isBoolean = function (e) {
            return "boolean" == typeof e
        }, r.isPromise = function (e) {
            return e && r.isFunction(e.then)
        };
        for (var m = ["Arguments", "Function", "String", "Number", "Date", "RegExp"], g = 0; g < m.length; g++)n(m[g]);
        return r
    }), define("durandal/viewEngine", ["durandal/system", "jquery"], function (e, t) {
        var n;
        return n = t.parseHTML ? function (e) {
            return t.parseHTML(e)
        } : function (e) {
            return t(e).get()
        }, {
            cache: {}, viewExtension: ".html", viewPlugin: "text", viewPluginParameters: "", isViewUrl: function (e) {
                return -1 !== e.indexOf(this.viewExtension, e.length - this.viewExtension.length)
            }, convertViewUrlToViewId: function (e) {
                return e.substring(0, e.length - this.viewExtension.length)
            }, convertViewIdToRequirePath: function (e) {
                var t = this.viewPlugin ? this.viewPlugin + "!" : "";
                return t + e + this.viewExtension + this.viewPluginParameters
            }, parseMarkup: n, processMarkup: function (e) {
                var t = this.parseMarkup(e);
                return this.ensureSingleElement(t)
            }, ensureSingleElement: function (e) {
                if (1 == e.length)return e[0];
                for (var n = [], r = 0; r < e.length; r++) {
                    var i = e[r];
                    if (8 != i.nodeType) {
                        if (3 == i.nodeType) {
                            var a = /\S/.test(i.nodeValue);
                            if (!a)continue
                        }
                        n.push(i)
                    }
                }
                return n.length > 1 ? t(n).wrapAll('<div class="durandal-wrapper"></div>').parent().get(0) : n[0]
            }, tryGetViewFromCache: function (e) {
                return this.cache[e]
            }, putViewInCache: function (e, t) {
                this.cache[e] = t
            }, createView: function (t) {
                var n = this, r = this.convertViewIdToRequirePath(t), i = this.tryGetViewFromCache(r);
                return i ? e.defer(function (e) {
                    e.resolve(i.cloneNode(!0))
                }).promise() : e.defer(function (i) {
                    e.acquire(r).then(function (e) {
                        var a = n.processMarkup(e);
                        a.setAttribute("data-view", t), n.putViewInCache(r, a), i.resolve(a.cloneNode(!0))
                    }).fail(function (e) {
                        n.createFallbackView(t, r, e).then(function (e) {
                            e.setAttribute("data-view", t), n.cache[r] = e, i.resolve(e.cloneNode(!0))
                        })
                    })
                }).promise()
            }, createFallbackView: function (t, n) {
                var r = this, i = 'View Not Found. Searched for "' + t + '" via path "' + n + '".';
                return e.defer(function (e) {
                    e.resolve(r.processMarkup('<div class="durandal-view-404">' + i + "</div>"))
                }).promise()
            }
        }
    }), define("durandal/viewLocator", ["durandal/system", "durandal/viewEngine"], function (e, t) {
        function n(e, t) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n], i = r.getAttribute("data-view");
                if (i == t)return r
            }
        }

        function r(e) {
            return (e + "").replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1")
        }

        return {
            useConvention: function (e, t, n) {
                e = e || "viewmodels", t = t || "views", n = n || t;
                var i = new RegExp(r(e), "gi");
                this.convertModuleIdToViewId = function (e) {
                    return e.replace(i, t)
                }, this.translateViewIdToArea = function (e, t) {
                    return t && "partial" != t ? n + "/" + t + "/" + e : n + "/" + e
                }
            }, locateViewForObject: function (t, n, r) {
                var i;
                if (t.getView && (i = t.getView()))return this.locateView(i, n, r);
                if (t.viewUrl)return this.locateView(t.viewUrl, n, r);
                var a = e.getModuleId(t);
                return a ? this.locateView(this.convertModuleIdToViewId(a), n, r) : this.locateView(this.determineFallbackViewId(t), n, r)
            }, convertModuleIdToViewId: function (e) {
                return e
            }, determineFallbackViewId: function (e) {
                var t = /function (.{1,})\(/, n = t.exec(e.constructor.toString()), r = n && n.length > 1 ? n[1] : "";
                return r = r.trim(), "views/" + r
            }, translateViewIdToArea: function (e) {
                return e
            }, locateView: function (r, i, a) {
                if ("string" == typeof r) {
                    var o;
                    if (o = t.isViewUrl(r) ? t.convertViewUrlToViewId(r) : r, i && (o = this.translateViewIdToArea(o, i)), a) {
                        var s = n(a, o);
                        if (s)return e.defer(function (e) {
                            e.resolve(s)
                        }).promise()
                    }
                    return t.createView(o)
                }
                return e.defer(function (e) {
                    e.resolve(r)
                }).promise()
            }
        }
    }), define("durandal/binder", ["durandal/system", "knockout"], function (e, t) {
        function n(t) {
            return void 0 === t ? {applyBindings: !0} : e.isBoolean(t) ? {applyBindings: t} : (void 0 === t.applyBindings && (t.applyBindings = !0), t)
        }

        function r(r, c, l, d) {
            if (!c || !l)return void(i.throwOnErrors ? e.error(a) : e.log(a, c, d));
            if (!c.getAttribute)return void(i.throwOnErrors ? e.error(o) : e.log(o, c, d));
            var f = c.getAttribute("data-view");
            try {
                var p;
                return r && r.binding && (p = r.binding(c)), p = n(p), i.binding(d, c, p), p.applyBindings ? (e.log("Binding", f, d), t.applyBindings(l, c)) : r && t.utils.domData.set(c, u, {$data: r}), i.bindingComplete(d, c, p), r && r.bindingComplete && r.bindingComplete(c), t.utils.domData.set(c, s, p), p
            } catch (h) {
                h.message = h.message + ";\nView: " + f + ";\nModuleId: " + e.getModuleId(d), i.throwOnErrors ? e.error(h) : e.log(h.message)
            }
        }

        var i, a = "Insufficient Information to Bind", o = "Unexpected View Type", s = "durandal-binding-instruction", u = "__ko_bindingContext__";
        return i = {
            binding: e.noop, bindingComplete: e.noop, throwOnErrors: !1, getBindingInstruction: function (e) {
                return t.utils.domData.get(e, s)
            }, bindContext: function (e, t, n, i) {
                return n && e && (e = e.createChildContext(n, "string" == typeof i ? i : null)), r(n, t, e, n || (e ? e.$data : null))
            }, bind: function (e, t) {
                return r(e, t, e, e)
            }
        }
    }), define("durandal/activator", ["durandal/system", "knockout"], function (e, t) {
        function n(t) {
            return void 0 == t && (t = {}), e.isBoolean(t.closeOnDeactivate) || (t.closeOnDeactivate = c.defaults.closeOnDeactivate), t.beforeActivate || (t.beforeActivate = c.defaults.beforeActivate), t.afterDeactivate || (t.afterDeactivate = c.defaults.afterDeactivate), t.affirmations || (t.affirmations = c.defaults.affirmations), t.interpretResponse || (t.interpretResponse = c.defaults.interpretResponse), t.areSameItem || (t.areSameItem = c.defaults.areSameItem), t.findChildActivator || (t.findChildActivator = c.defaults.findChildActivator), t
        }

        function r(t, n, r) {
            return e.isArray(r) ? t[n].apply(t, r) : t[n](r)
        }

        function i(t, n, r, i, a) {
            if (t && t.deactivate) {
                e.log("Deactivating", t);
                var o;
                try {
                    o = t.deactivate(n)
                } catch (s) {
                    return e.log("ERROR: " + s.message, s), void i.resolve(!1)
                }
                o && o.then ? o.then(function () {
                    r.afterDeactivate(t, n, a), i.resolve(!0)
                }, function (t) {
                    e.log(t), i.resolve(!1)
                }) : (r.afterDeactivate(t, n, a), i.resolve(!0))
            } else t && r.afterDeactivate(t, n, a), i.resolve(!0)
        }

        function a(t, n, i, a) {
            var o;
            if (t && t.activate) {
                e.log("Activating", t);
                try {
                    o = r(t, "activate", a)
                } catch (s) {
                    return e.log("ERROR: " + s.message, s), void i(!1)
                }
            }
            o && o.then ? o.then(function () {
                n(t), i(!0)
            }, function (t) {
                e.log("ERROR: " + t.message, t), i(!1)
            }) : (n(t), i(!0))
        }

        function o(t, n, r, i) {
            return i = e.extend({}, l, i), r.lifecycleData = null, e.defer(function (a) {
                function o() {
                    if (t && t.canDeactivate && i.canDeactivate) {
                        var o;
                        try {
                            o = t.canDeactivate(n)
                        } catch (s) {
                            return e.log("ERROR: " + s.message, s), void a.resolve(!1)
                        }
                        o.then ? o.then(function (e) {
                            r.lifecycleData = e, a.resolve(r.interpretResponse(e))
                        }, function (t) {
                            e.log("ERROR: " + t.message, t), a.resolve(!1)
                        }) : (r.lifecycleData = o, a.resolve(r.interpretResponse(o)))
                    } else a.resolve(!0)
                }

                var s = r.findChildActivator(t);
                s ? s.canDeactivate().then(function (e) {
                    e ? o() : a.resolve(!1)
                }) : o()
            }).promise()
        }

        function s(t, n, i, a, o) {
            return i.lifecycleData = null, e.defer(function (s) {
                if (i.areSameItem(n(), t, a, o))return void s.resolve(!0);
                if (t && t.canActivate) {
                    var u;
                    try {
                        u = r(t, "canActivate", o)
                    } catch (c) {
                        return e.log("ERROR: " + c.message, c), void s.resolve(!1)
                    }
                    u.then ? u.then(function (e) {
                        i.lifecycleData = e, s.resolve(i.interpretResponse(e))
                    }, function (t) {
                        e.log("ERROR: " + t.message, t), s.resolve(!1)
                    }) : (i.lifecycleData = u, s.resolve(i.interpretResponse(u)))
                } else s.resolve(!0)
            }).promise()
        }

        function u(r, u) {
            var c, l = t.observable(null);
            u = n(u);
            var d = t.computed({
                read: function () {
                    return l()
                }, write: function (e) {
                    d.viaSetter = !0, d.activateItem(e)
                }
            });
            return d.__activator__ = !0, d.settings = u, u.activator = d, d.isActivating = t.observable(!1), d.forceActiveItem = function (e) {
                l(e)
            }, d.canDeactivateItem = function (e, t, n) {
                return o(e, t, u, n)
            }, d.deactivateItem = function (t, n) {
                return e.defer(function (e) {
                    d.canDeactivateItem(t, n).then(function (r) {
                        r ? i(t, n, u, e, l) : (d.notifySubscribers(), e.resolve(!1))
                    })
                }).promise()
            }, d.canActivateItem = function (e, t) {
                return s(e, l, u, c, t)
            }, d.activateItem = function (t, n, r) {
                var o = d.viaSetter;
                return d.viaSetter = !1, e.defer(function (s) {
                    if (d.isActivating())return void s.resolve(!1);
                    d.isActivating(!0);
                    var f = l();
                    return u.areSameItem(f, t, c, n) ? (d.isActivating(!1), void s.resolve(!0)) : void d.canDeactivateItem(f, u.closeOnDeactivate, r).then(function (r) {
                        r ? d.canActivateItem(t, n).then(function (r) {
                            r ? e.defer(function (e) {
                                i(f, u.closeOnDeactivate, u, e)
                            }).promise().then(function () {
                                t = u.beforeActivate(t, n), a(t, l, function (e) {
                                    c = n, d.isActivating(!1), s.resolve(e)
                                }, n)
                            }) : (o && d.notifySubscribers(), d.isActivating(!1), s.resolve(!1))
                        }) : (o && d.notifySubscribers(), d.isActivating(!1), s.resolve(!1))
                    })
                }).promise()
            }, d.canActivate = function () {
                var e;
                return r ? (e = r, r = !1) : e = d(), d.canActivateItem(e)
            }, d.activate = function () {
                var e;
                return r ? (e = r, r = !1) : e = d(), d.activateItem(e)
            }, d.canDeactivate = function (e) {
                return d.canDeactivateItem(d(), e)
            }, d.deactivate = function (e) {
                return d.deactivateItem(d(), e)
            }, d.includeIn = function (e) {
                e.canActivate = function () {
                    return d.canActivate()
                }, e.activate = function () {
                    return d.activate()
                }, e.canDeactivate = function (e) {
                    return d.canDeactivate(e)
                }, e.deactivate = function (e) {
                    return d.deactivate(e)
                }
            }, u.includeIn ? d.includeIn(u.includeIn) : r && d.activate(), d.forItems = function (t) {
                u.closeOnDeactivate = !1, u.determineNextItemToActivate = function (e, t) {
                    var n = t - 1;
                    return -1 == n && e.length > 1 ? e[1] : n > -1 && n < e.length - 1 ? e[n] : null
                }, u.beforeActivate = function (e) {
                    var n = d();
                    if (e) {
                        var r = t.indexOf(e);
                        -1 == r ? t.push(e) : e = t()[r]
                    } else e = u.determineNextItemToActivate(t, n ? t.indexOf(n) : 0);
                    return e
                }, u.afterDeactivate = function (e, n) {
                    n && t.remove(e)
                };
                var n = d.canDeactivate;
                d.canDeactivate = function (r) {
                    return r ? e.defer(function (e) {
                        function n() {
                            for (var t = 0; t < a.length; t++)if (!a[t])return void e.resolve(!1);
                            e.resolve(!0)
                        }

                        for (var i = t(), a = [], o = 0; o < i.length; o++)d.canDeactivateItem(i[o], r).then(function (e) {
                            a.push(e), a.length == i.length && n()
                        })
                    }).promise() : n()
                };
                var r = d.deactivate;
                return d.deactivate = function (n) {
                    return n ? e.defer(function (e) {
                        function r(r) {
                            setTimeout(function () {
                                d.deactivateItem(r, n).then(function () {
                                    a++, t.remove(r), a == o && e.resolve()
                                })
                            }, 1)
                        }

                        for (var i = t(), a = 0, o = i.length, s = 0; o > s; s++)r(i[s])
                    }).promise() : r()
                }, d
            }, d
        }

        var c, l = {canDeactivate: !0}, d = {
            closeOnDeactivate: !0,
            affirmations: ["yes", "ok", "true"],
            interpretResponse: function (n) {
                return e.isObject(n) && (n = n.can || !1), e.isString(n) ? -1 !== t.utils.arrayIndexOf(this.affirmations, n.toLowerCase()) : n
            },
            areSameItem: function (e, t) {
                return e == t
            },
            beforeActivate: function (e) {
                return e
            },
            afterDeactivate: function (e, t, n) {
                t && n && n(null)
            },
            findChildActivator: function () {
                return null
            }
        };
        return c = {
            defaults: d, create: u, isActivator: function (e) {
                return e && e.__activator__
            }
        }
    }), define("durandal/composition", ["durandal/system", "durandal/viewLocator", "durandal/binder", "durandal/viewEngine", "durandal/activator", "jquery", "knockout"], function (e, t, n, r, i, a, o) {
        function s(t, n, r) {
            try {
                if (t.onError)try {
                    t.onError(n, r)
                } catch (i) {
                    e.error(i)
                } else e.error(n)
            } finally {
                c(t, r, !0)
            }
        }

        function u(e) {
            for (var t = [], n = {
                childElements: t,
                activeView: null
            }, r = o.virtualElements.firstChild(e); r;)1 == r.nodeType && (t.push(r), r.getAttribute(S) && (n.activeView = r)), r = o.virtualElements.nextSibling(r);
            return n.activeView || (n.activeView = t[0]), n
        }

        function c(e, t, n) {
            if (R--, 0 === R) {
                var r = D;
                D = [], n || setTimeout(function () {
                    for (var n = r.length; n--;)try {
                        r[n]()
                    } catch (i) {
                        s(e, i, t)
                    }
                }, 1)
            }
            l(e)
        }

        function l(e) {
            delete e.activeView, delete e.viewElements
        }

        function d(t, n, r, i) {
            if (r)n(); else if (t.activate && t.model && t.model.activate) {
                var a;
                try {
                    a = e.isArray(t.activationData) ? t.model.activate.apply(t.model, t.activationData) : t.model.activate(t.activationData), a && a.then ? a.then(n, function (e) {
                        s(t, e, i), n()
                    }) : a || void 0 === a ? n() : c(t, i)
                } catch (o) {
                    s(t, o, i)
                }
            } else n()
        }

        function f(t, n) {
            var t = this;
            if (t.activeView && t.activeView.removeAttribute(S), t.child)try {
                t.model && t.model.attached && (t.composingNewView || t.alwaysTriggerAttach) && t.model.attached(t.child, t.parent, t), t.attached && t.attached(t.child, t.parent, t), t.child.setAttribute(S, !0), t.composingNewView && t.model && t.model.detached && o.utils.domNodeDisposal.addDisposeCallback(t.child, function () {
                    try {
                        t.model.detached(t.child, t.parent, t)
                    } catch (e) {
                        s(t, e, n)
                    }
                })
            } catch (r) {
                s(t, r, n)
            }
            t.triggerAttach = e.noop
        }

        function p(t) {
            if (e.isString(t.transition)) {
                if (t.activeView) {
                    if (t.activeView == t.child)return !1;
                    if (!t.child)return !0;
                    if (t.skipTransitionOnSameViewId) {
                        var n = t.activeView.getAttribute("data-view"), r = t.child.getAttribute("data-view");
                        return n != r
                    }
                }
                return !0
            }
            return !1
        }

        function h(e) {
            for (var t = 0, n = e.length, r = []; n > t; t++) {
                var i = e[t].cloneNode(!0);
                r.push(i)
            }
            return r
        }

        function m(t) {
            var n = h(t.parts), r = w.getParts(n), i = w.getParts(t.child);
            for (var o in r) {
                var s = i[o];
                s || (s = a('[data-part="' + o + '"]', t.child).get(0)) ? s.parentNode.replaceChild(r[o], s) : e.log("Could not find part to override: " + o)
            }
        }

        function g(t) {
            var n, r, i = o.virtualElements.childNodes(t.parent);
            if (!e.isArray(i)) {
                var a = [];
                for (n = 0, r = i.length; r > n; n++)a[n] = i[n];
                i = a
            }
            for (n = 1, r = i.length; r > n; n++)o.removeNode(i[n])
        }

        function v(e) {
            o.utils.domData.set(e, A, e.style.display), e.style.display = "none"
        }

        function y(e) {
            var t = o.utils.domData.get(e, A);
            e.style.display = "none" === t ? "block" : t
        }

        function b(e) {
            var t = e.getAttribute("data-bind");
            if (!t)return !1;
            for (var n = 0, r = O.length; r > n; n++)if (t.indexOf(O[n]) > -1)return !0;
            return !1
        }

        var w, x = {}, S = "data-active-view", D = [], R = 0, k = "durandal-composition-data", C = "data-part", M = ["model", "view", "transition", "area", "strategy", "activationData", "onError"], A = "durandal-visibility-data", O = ["compose:"], T = {
            complete: function (e) {
                D.push(e)
            }
        };
        return w = {
            composeBindings: O, convertTransitionToModuleId: function (e) {
                return "transitions/" + e
            }, defaultTransitionName: null, current: T, addBindingHandler: function (e, t, n) {
                var r, i, a = "composition-handler-" + e;
                t = t || o.bindingHandlers[e], n = n || function () {
                        return void 0
                    }, i = o.bindingHandlers[e] = {
                    init: function (e, r, i, s, u) {
                        if (R > 0) {
                            var c = {trigger: o.observable(null)};
                            w.current.complete(function () {
                                t.init && t.init(e, r, i, s, u), t.update && (o.utils.domData.set(e, a, t), c.trigger("trigger"))
                            }), o.utils.domData.set(e, a, c)
                        } else o.utils.domData.set(e, a, t), t.init && t.init(e, r, i, s, u);
                        return n(e, r, i, s, u)
                    }, update: function (e, t, n, r, i) {
                        var s = o.utils.domData.get(e, a);
                        return s.update ? s.update(e, t, n, r, i) : void(s.trigger && s.trigger())
                    }
                };
                for (r in t)"init" !== r && "update" !== r && (i[r] = t[r])
            }, getParts: function (e, t) {
                if (t = t || {}, !e)return t;
                void 0 === e.length && (e = [e]);
                for (var n = 0, r = e.length; r > n; n++) {
                    var i, a = e[n];
                    a.getAttribute && (i = a.getAttribute(C), i && (t[i] = a), a.hasChildNodes() && !b(a) && w.getParts(a.childNodes, t))
                }
                return t
            }, cloneNodes: h, finalize: function (t, r) {
                if (void 0 === t.transition && (t.transition = this.defaultTransitionName), t.child || t.activeView)if (p(t)) {
                    var i = this.convertTransitionToModuleId(t.transition);
                    e.acquire(i).then(function (e) {
                        t.transition = e, e(t).then(function () {
                            if (t.cacheViews) {
                                if (t.activeView) {
                                    var e = n.getBindingInstruction(t.activeView);
                                    e && void 0 != e.cacheViews && !e.cacheViews ? o.removeNode(t.activeView) : v(t.activeView)
                                }
                            } else t.child ? g(t) : o.virtualElements.emptyNode(t.parent);
                            t.child && y(t.child), t.triggerAttach(t, r), c(t, r)
                        })
                    }).fail(function (e) {
                        s(t, "Failed to load transition (" + i + "). Details: " + e.message, r)
                    })
                } else {
                    if (t.child != t.activeView) {
                        if (t.cacheViews && t.activeView) {
                            var a = n.getBindingInstruction(t.activeView);
                            !a || void 0 != a.cacheViews && !a.cacheViews ? o.removeNode(t.activeView) : v(t.activeView)
                        }
                        t.child ? (t.cacheViews || g(t), y(t.child)) : t.cacheViews || o.virtualElements.emptyNode(t.parent)
                    }
                    t.triggerAttach(t, r), c(t, r)
                } else t.cacheViews || o.virtualElements.emptyNode(t.parent), t.triggerAttach(t, r), c(t, r)
            }, bindAndShow: function (e, t, i, a) {
                i.child = e, i.parent.__composition_context = i, i.composingNewView = i.cacheViews ? -1 == o.utils.arrayIndexOf(i.viewElements, e) : !0, d(i, function () {
                    if (i.parent.__composition_context == i) {
                        if (delete i.parent.__composition_context, i.binding && i.binding(i.child, i.parent, i), i.preserveContext && i.bindingContext)i.composingNewView && (i.parts && m(i), v(e), o.virtualElements.prepend(i.parent, e), n.bindContext(i.bindingContext, e, i.model, i.as)); else if (e) {
                            var a = i.model || x, s = o.dataFor(e);
                            if (s != a) {
                                if (!i.composingNewView)return o.removeNode(e), void r.createView(e.getAttribute("data-view")).then(function (e) {
                                    w.bindAndShow(e, t, i, !0)
                                });
                                i.parts && m(i), v(e), o.virtualElements.prepend(i.parent, e), n.bind(a, e)
                            }
                        }
                        w.finalize(i, t)
                    } else c(i, t)
                }, a, t)
            }, defaultStrategy: function (e) {
                return t.locateViewForObject(e.model, e.area, e.viewElements)
            }, getSettings: function (t) {
                var n, a = t(), s = o.utils.unwrapObservable(a) || {}, u = i.isActivator(a);
                if (e.isString(s))return s = r.isViewUrl(s) ? {view: s} : {model: s, activate: !u};
                if (n = e.getModuleId(s))return s = {model: s, activate: !u};
                !u && s.model && (u = i.isActivator(s.model));
                for (var c in s)s[c] = -1 != o.utils.arrayIndexOf(M, c) ? o.utils.unwrapObservable(s[c]) : s[c];
                return u ? s.activate = !1 : void 0 === s.activate && (s.activate = !0), s
            }, executeStrategy: function (e, t) {
                e.strategy(e).then(function (n) {
                    w.bindAndShow(n, t, e)
                })
            }, inject: function (n, r) {
                return n.model ? n.view ? void t.locateView(n.view, n.area, n.viewElements).then(function (e) {
                    w.bindAndShow(e, r, n)
                }) : (n.strategy || (n.strategy = this.defaultStrategy), void(e.isString(n.strategy) ? e.acquire(n.strategy).then(function (e) {
                    n.strategy = e, w.executeStrategy(n, r)
                }).fail(function (e) {
                    s(n, "Failed to load view strategy (" + n.strategy + "). Details: " + e.message, r)
                }) : this.executeStrategy(n, r))) : void this.bindAndShow(null, r, n)
            }, compose: function (n, r, i, a) {
                R++, a || (r = w.getSettings(function () {
                    return r
                }, n)), r.compositionComplete && D.push(function () {
                    r.compositionComplete(r.child, r.parent, r)
                }), D.push(function () {
                    r.composingNewView && r.model && r.model.compositionComplete && r.model.compositionComplete(r.child, r.parent, r)
                });
                var o = u(n);
                r.activeView = o.activeView, r.parent = n, r.triggerAttach = f, r.bindingContext = i, r.cacheViews && !r.viewElements && (r.viewElements = o.childElements), r.model ? e.isString(r.model) ? e.acquire(r.model).then(function (t) {
                    r.model = e.resolveObject(t), w.inject(r, n)
                }).fail(function (e) {
                    s(r, "Failed to load composed module (" + r.model + "). Details: " + e.message, n)
                }) : w.inject(r, n) : r.view ? (r.area = r.area || "partial", r.preserveContext = !0, t.locateView(r.view, r.area, r.viewElements).then(function (e) {
                    w.bindAndShow(e, n, r)
                })) : this.bindAndShow(null, n, r)
            }
        }, o.bindingHandlers.compose = {
            init: function () {
                return {controlsDescendantBindings: !0}
            }, update: function (e, t, n, i, a) {
                var s = w.getSettings(t, e);
                if (s.mode) {
                    var u = o.utils.domData.get(e, k);
                    if (!u) {
                        var c = o.virtualElements.childNodes(e);
                        u = {}, "inline" === s.mode ? u.view = r.ensureSingleElement(c) : "templated" === s.mode && (u.parts = h(c)), o.virtualElements.emptyNode(e), o.utils.domData.set(e, k, u)
                    }
                    "inline" === s.mode ? s.view = u.view.cloneNode(!0) : "templated" === s.mode && (s.parts = u.parts), s.preserveContext = !0
                }
                w.compose(e, s, a, !0)
            }
        }, o.virtualElements.allowedBindings.compose = !0, w
    }), define("durandal/events", ["durandal/system"], function (e) {
        var t = /\s+/, n = function () {
        }, r = function (e, t) {
            this.owner = e, this.events = t
        };
        return r.prototype.then = function (e, t) {
            return this.callback = e || this.callback, this.context = t || this.context, this.callback ? (this.owner.on(this.events, this.callback, this.context), this) : this
        }, r.prototype.on = r.prototype.then, r.prototype.off = function () {
            return this.owner.off(this.events, this.callback, this.context), this
        }, n.prototype.on = function (e, n, i) {
            var a, o, s;
            if (n) {
                for (a = this.callbacks || (this.callbacks = {}), e = e.split(t); o = e.shift();)s = a[o] || (a[o] = []), s.push(n, i);
                return this
            }
            return new r(this, e)
        }, n.prototype.off = function (n, r, i) {
            var a, o, s, u;
            if (!(o = this.callbacks))return this;
            if (!(n || r || i))return delete this.callbacks, this;
            for (n = n ? n.split(t) : e.keys(o); a = n.shift();)if ((s = o[a]) && (r || i))for (u = s.length - 2; u >= 0; u -= 2)r && s[u] !== r || i && s[u + 1] !== i || s.splice(u, 2); else delete o[a];
            return this
        }, n.prototype.trigger = function (e) {
            var n, r, i, a, o, s, u, c;
            if (!(r = this.callbacks))return this;
            for (c = [], e = e.split(t), a = 1, o = arguments.length; o > a; a++)c[a - 1] = arguments[a];
            for (; n = e.shift();) {
                if ((u = r.all) && (u = u.slice()), (i = r[n]) && (i = i.slice()), i)for (a = 0, o = i.length; o > a; a += 2)i[a].apply(i[a + 1] || this, c);
                if (u)for (s = [n].concat(c), a = 0, o = u.length; o > a; a += 2)u[a].apply(u[a + 1] || this, s)
            }
            return this
        }, n.prototype.proxy = function (e) {
            var t = this;
            return function (n) {
                t.trigger(e, n)
            }
        }, n.includeIn = function (e) {
            e.on = n.prototype.on, e.off = n.prototype.off, e.trigger = n.prototype.trigger, e.proxy = n.prototype.proxy
        }, n
    }), define("durandal/app", ["durandal/system", "durandal/viewEngine", "durandal/composition", "durandal/events", "jquery"], function (e, t, n, r, i) {
        function a() {
            return e.defer(function (t) {
                return 0 == s.length ? void t.resolve() : void e.acquire(s).then(function (n) {
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r];
                        if (i.install) {
                            var a = u[r];
                            e.isObject(a) || (a = {}), i.install(a), e.log("Plugin:Installed " + s[r])
                        } else e.log("Plugin:Loaded " + s[r])
                    }
                    t.resolve()
                }).fail(function (t) {
                    e.error("Failed to load plugin(s). Details: " + t.message)
                })
            }).promise()
        }

        var o, s = [], u = [];
        return o = {
            title: "Application", configurePlugins: function (t, n) {
                var r = e.keys(t);
                n = n || "plugins/", -1 === n.indexOf("/", n.length - 1) && (n += "/");
                for (var i = 0; i < r.length; i++) {
                    var a = r[i];
                    s.push(n + a), u.push(t[a])
                }
            }, start: function () {
                return e.log("Application:Starting"), this.title && (document.title = this.title), e.defer(function (t) {
                    i(function () {
                        a().then(function () {
                            t.resolve(), e.log("Application:Started")
                        })
                    })
                }).promise()
            }, setRoot: function (r, i, a) {
                function o() {
                    if (u.model)if (u.model.canActivate)try {
                        var t = u.model.canActivate();
                        t && t.then ? t.then(function (e) {
                            e && n.compose(s, u)
                        }).fail(function (t) {
                            e.error(t)
                        }) : t && n.compose(s, u)
                    } catch (r) {
                        e.error(r)
                    } else n.compose(s, u); else n.compose(s, u)
                }

                var s, u = {activate: !0, transition: i};
                s = !a || e.isString(a) ? document.getElementById(a || "applicationHost") : a, e.isString(r) && t.isViewUrl(r) ? u.view = r : u.model = r, e.isString(u.model) ? e.acquire(u.model).then(function (t) {
                    u.model = e.resolveObject(t), o()
                }).fail(function (t) {
                    e.error("Failed to load root module (" + u.model + "). Details: " + t.message)
                }) : o()
            }
        }, r.includeIn(o), o
    }), require.config({
        paths: {
            jquery: ["//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min", "../lib/jQuery/jquery-2.1.3.min"],
            bootstrap: ["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min", "../lib/bootstrap/bootstrap.min"],
            knockout: ["//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min", "../lib/knockout/knockout-3.2.0"],
            komapping: ["//cdnjs.cloudflare.com/ajax/libs/knockout.mapping/2.4.1/knockout.mapping.min", "../lib/knockout.mapping-latest"],
            openLayers: ["//cdnjs.cloudflare.com/ajax/libs/ol3/3.4.0/ol.min", "../lib/openlayers/ol"],
            moment: ["//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment"],
            flot: ["//cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.min", "../lib/jQuery.flot/jQuery.flot.min"],
            flotResize: ["//cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.resize.min", "../lib/jQuery.flot/jQuery.flot.resize.min"],
            flotTime: ["//cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.time.min", "../lib/jQuery.flot/jQuery.flot.time.min"],
            flotArrows: "../lib/jQuery.flot/jquery.flot.symbol.arrows",
            numeral: ["//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min"],
            text: "../lib/require/text",
            plugins: "../lib/durandal/plugins",
            durandal: "../lib/durandal",
            models: "../App/models",
            transitions: "../lib/durandal/transitions",
            maphilight: "../lib/jQuery/jquery.maphilight.min",
            pace: "../lib/pace/pace.min",
            underscore: "../lib/underscore/underscore-min",
            typeahead: "../lib/typeahead/typeahead.jquery.min"
        },
        shim: {
            flotResize: {deps: ["flot"], exports: "flotResize"},
            flotTime: {deps: ["flot"], exports: "flotTime"},
            flotArrows: {deps: ["flot"], exports: "flotArrows"}
        }
    }), define("main", ["durandal/app", "durandal/system", "durandal/viewLocator", "durandal/viewEngine", "numeral"], function (e, t, n, r, i) {
        e.configurePlugins({
            router: !0,
            dialog: !0,
            widget: !0
        }), r.viewExtension = "/", r.viewPlugin = "text", e.start().then(function () {
            n.useConvention("viewmodels", "../.."), e.setRoot("viewmodels/home/shell", "entrance")
        }), i.language("pl", {
            delimiters: {thousands: "", decimal: ","},
            abbreviations: {thousand: "tys.", million: "mln", billion: "mld", trillion: "bln"},
            ordinal: function () {
                return "."
            },
            currency: {symbol: "PLN"}
        }), i.language("pl"), e.title = "Monitor"
    }), define("models/area", ["require", "knockout"], function (e, t) {
        function n(e, n) {
            var r = this;
            r.name = t.observable(e), r.nodes = t.observableArray(n)
        }

        return n
    }), define("models/common", ["knockout"], function (e) {
        var t = {
            createTableData: function (e, t, n, r) {
                var i = [], a = Object.keys(e);
                a.sort(function (e, t) {
                    return +t - +e
                });
                for (var o = 0; o < a.length; o++) {
                    var s = a[o];
                    e[s][0] = moment(e[s][0]).utc().format("YYYY-MM-DD HH:mm");
                    for (var u = 1; r > u; u++)e[s][u] || (e[s][u] = "");
                    i.push(e[s])
                }
                return i
            }, getMeteoConnections: function (t) {
                if (void 0 != t.meteo && t.meteo.length > 0) {
                    var n = e.utils.arrayMap(t.meteo, function (e) {
                        return {name: e.item3, id: e.item1, area: e.item2}
                    });
                    return n
                }
                return []
            }, getHydroConnections: function (e) {
                var t = [];
                if (null != e.hydroUp) {
                    var n = {name: e.hydroUp.item3, id: e.hydroUp.item1, area: e.hydroUp.item2, direction: "up"};
                    t.push(n)
                }
                if (null != e.hydroDown) {
                    var r = {
                        name: e.hydroDown.item3,
                        id: e.hydroDown.item1,
                        area: e.hydroDown.item2,
                        direction: "down"
                    };
                    t.push(r)
                }
                return t
            }
        };
        return t
    }), define("models/constants", [], function () {
        var e = {instance: {}};
        return e
    }), define("models/dynamicMapHydroObject", ["require", "knockout", "models/constants"], function (e, t, n) {
        function r(e, r, i, a, o, s, u, c) {
            var l = this;
            l.id = t.observable(e), l.name = t.observable(r), l.area = t.observable(i), l.state = t.observable(a), l.longitude = t.observable(o), l.latitude = t.observable(s), l.currentValue = t.observable(u), l.currentDate = t.observable(c), l.title = t.computed(function () {
                return l.name() + " (" + l.id() + ")"
            }), l.titleWithState = t.computed(function () {
                return l.title() + " - " + n.instance.hydroStatusLabels[l.state()]
            }), l.imageSource = t.computed(function () {
                return "Content/images/maps/state/hydro/" + l.state() + ".png"
            })
        }

        return r
    }), define("models/dynamicMapMeteoObject", ["require", "knockout", "models/constants"], function (e, t, n) {
        function r(e, r, i, a, o, s, u, c) {
            var l = this;
            l.id = t.observable(e), l.name = t.observable(r), l.area = t.observable(i), l.state = t.observable(a), l.longitude = t.observable(o), l.latitude = t.observable(s), l.precipDate = t.observable(c), l.precipValue = t.observable(u), l.title = t.computed(function () {
                return l.name() + " (" + l.id() + ")"
            }), l.titleWithState = t.computed(function () {
                return l.title() + " - " + n.instance.meteoStatusLabels[l.state()]
            }), l.imageSource = t.computed(function () {
                return "Content/images/maps/state/meteo/" + l.state() + ".png"
            })
        }

        return r
    }), define("models/hydroStation", ["knockout", "moment", "models/constants", "models/common"], function (e, t, n, r) {
        function i(i, a, o, s, u, c, l, d, f, p, h, m, g, v, y, b, w, x) {
            function S(e, t, n) {
                void 0 == C.datesWithRecords[e] && (C.datesWithRecords[e] = [], C.datesWithRecords[e][0] = e), C.datesWithRecords[e][n] = t
            }

            function D(n, r, i) {
                if (void 0 != n && n.length > 0) {
                    if (void 0 != i)for (var a = 0; a < n.length; a++)i(n[a]) || n.splice(a, 1);
                    var o = e.utils.arrayMap(n, function (e) {
                        var n = t.utc(e.date), r = {date: n, value: e.value};
                        return null != e.state && (r.state = e.state), C.addDateAndRecord(n.valueOf(), r, O), r
                    });
                    r.push.apply(r, o);
                    var s = r()[0].date, u = r()[r().length - 1].date;
                    M = M ? t.min(M, s) : s, A = A ? t.max(A, u) : u, O++
                }
            }

            function R(e) {
                e.value = k(e.value, !0);
                for (var t = !1, n = 0; n < c.length; n++)if (c[n].date == e.date) {
                    t = !0;
                    break
                }
                return t
            }

            function k(e, t) {
                var n = e, r = null;
                return .05 > e ? r = "[00]0.000" : e >= .05 && 10 > e ? r = "[00]0.00" : e >= 10 && 100 > e ? r = "[00]0.0" : e >= 100 && 1e3 > e ? r = "000" : e >= 1e3 && 1e4 > e ? (r = "0000", e = 10 * numeral(.1 * e).format(r)) : e >= 1e4 && (r = "[0]0000", e = 100 * numeral(.01 * e).format(r)), null != r && (n = numeral(e).format(r)), t && "string" == typeof n ? numeral().unformat(n) : n
            }

            var C = this;
            C.addDateAndRecord = S, C.id = e.observable(i), C.name = e.observable(a), C.state = e.observable(o), C.status = e.observable(u), C.trend = e.observable(s), C.highestHighDischargeValue = e.observable(m), C.mediumHighDischargeValue = e.observable(g), C.highDischargeValue = e.observable(v), C.mediumOfYearMediumsDischargeValue = e.observable(y), C.lowDischargeValue = e.observable(b), C.mediumLowDischargeValue = e.observable(w), C.lowestLowDischargeValue = e.observable(x), C.waterStateRecords = e.observableArray(), C.waterStateObserverRecords = e.observableArray(), C.dischargeRecords = e.observableArray(), C.waterTemperatureAutoRecords = e.observableArray(), C.waterTemperatureObsRecords = e.observableArray(), C.connectionsHydro = [], C.connectionsMeteo = [], C.datesWithRecords = {}, C.trendText = e.pureComputed(function () {
                return n.instance.trendLabels[C.trend()]
            }), C.trendImgSource = e.pureComputed(function () {
                return "Content/images/maps/trend/" + C.trend() + ".png"
            });
            var M = void 0, A = void 0, O = 1;
            D(c, C.waterStateRecords), D(l, C.waterStateObserverRecords), D(d, C.dischargeRecords, R), D(f, C.waterTemperatureAutoRecords), D(p, C.waterTemperatureObsRecords), void 0 != h && (C.connectionsMeteo = r.getMeteoConnections(h), C.connectionsHydro = r.getHydroConnections(h)), void 0 !== M && void 0 !== A && (C.tableData = r.createTableData(C.datesWithRecords, M.clone(), A.clone(), O))
        }

        return i
    }), define("models/meteoStation", ["knockout", "moment", "models/common"], function (e, t, n) {
        function r(r, i, a, o, s, u, c, l, d, f, p, h, m, g, v) {
            function y(e, t, n) {
                void 0 == w.datesWithRecords[e] && (w.datesWithRecords[e] = [], w.datesWithRecords[e][0] = e), w.datesWithRecords[e][n] = t
            }

            function b(n, r) {
                if (void 0 != n && n.length > 0) {
                    var i = e.utils.arrayMap(n, function (e) {
                        var n = t.utc(e.date), r = {date: n, value: e.value};
                        return w.addDateAndRecord(n.valueOf(), r, D), r
                    });
                    r.push.apply(r, i);
                    var a = r()[0].date, o = r()[r().length - 1].date;
                    x = x ? t.min(x, a) : a, S = S ? t.max(S, o) : o, D++
                }
            }

            var w = this;
            w.addDateAndRecord = y, w.id = e.observable(r), w.name = e.observable(i), w.state = e.observable(a), w.status = e.observable(o), w.tenMinutesPrecipRecords = e.observableArray(), w.hourlyPrecipRecords = e.observableArray(), w.dailyPrecipRecords = e.observableArray(), w.temperatureAutoRecords = e.observableArray(), w.temperatureObsRecords = e.observableArray(), w.windDirectionTelRecords = e.observableArray(), w.windDirectionObsRecords = e.observableArray(), w.windVelocityTelRecords = e.observableArray(), w.windVelocityObsRecords = e.observableArray(), w.windMaxVelocityRecords = e.observableArray(), w.connectionsHydro = [], w.connectionsMeteo = [], w.datesWithRecords = {};
            var x = void 0, S = void 0, D = 1;
            b(s, w.tenMinutesPrecipRecords), b(u, w.hourlyPrecipRecords), b(c, w.dailyPrecipRecords), b(l, w.temperatureAutoRecords), b(d, w.temperatureObsRecords), b(g, w.windMaxVelocityRecords), b(h, w.windVelocityTelRecords), b(m, w.windVelocityObsRecords), b(f, w.windDirectionTelRecords), b(p, w.windDirectionObsRecords), void 0 != v && (w.connectionsMeteo = n.getMeteoConnections(v), w.connectionsHydro = n.getHydroConnections(v)), void 0 !== x && void 0 !== S && (w.tableData = n.createTableData(w.datesWithRecords, x.clone(), S.clone(), D))
        }

        return r
    }), define("viewmodels/home/contact", ["require", "knockout"], function () {
        function e() {
        }

        var t = {activate: e};
        return t
    }), define("plugins/history", ["durandal/system", "jquery"], function (e, t) {
        function n(e, t, n) {
            if (n) {
                var r = e.href.replace(/(javascript:|#).*$/, "");
                s.history.replaceState ? s.history.replaceState({}, document.title, r + "#" + t) : e.replace(r + "#" + t)
            } else e.hash = "#" + t
        }

        var r = /^[#\/]|\s+$/g, i = /^\/+|\/+$/g, a = /msie [\w.]+/, o = /\/$/, s = {interval: 50, active: !1};
        return "undefined" != typeof window && (s.location = window.location, s.history = window.history), s.getHash = function (e) {
            var t = (e || s).location.href.match(/#(.*)$/);
            return t ? t[1] : ""
        }, s.getFragment = function (e, t) {
            if (null == e)if (s._hasPushState || !s._wantsHashChange || t) {
                e = s.location.pathname + s.location.search;
                var n = s.root.replace(o, "");
                e.indexOf(n) || (e = e.substr(n.length))
            } else e = s.getHash();
            return e.replace(r, "")
        }, s.activate = function (n) {
            s.active && e.error("History has already been activated."), s.active = !0, s.options = e.extend({}, {root: "/"}, s.options, n), s.root = s.options.root, s._wantsHashChange = s.options.hashChange !== !1, s._wantsPushState = !!s.options.pushState, s._hasPushState = !!(s.options.pushState && s.history && s.history.pushState);
            var o = s.getFragment(), u = document.documentMode, c = a.exec(navigator.userAgent.toLowerCase()) && (!u || 7 >= u);
            s.root = ("/" + s.root + "/").replace(i, "/"), c && s._wantsHashChange && (s.iframe = t('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, s.navigate(o, !1)), s._hasPushState ? t(window).on("popstate", s.checkUrl) : s._wantsHashChange && "onhashchange"in window && !c ? t(window).on("hashchange", s.checkUrl) : s._wantsHashChange && (s._checkUrlInterval = setInterval(s.checkUrl, s.interval)), s.fragment = o;
            var l = s.location, d = l.pathname.replace(/[^\/]$/, "$&/") === s.root;
            if (s._wantsHashChange && s._wantsPushState) {
                if (!s._hasPushState && !d)return s.fragment = s.getFragment(null, !0), s.location.replace(s.root + s.location.search + "#" + s.fragment), !0;
                s._hasPushState && d && l.hash && (this.fragment = s.getHash().replace(r, ""), this.history.replaceState({}, document.title, s.root + s.fragment + l.search))
            }
            return s.options.silent ? void 0 : s.loadUrl(n.startRoute)
        }, s.deactivate = function () {
            t(window).off("popstate", s.checkUrl).off("hashchange", s.checkUrl), clearInterval(s._checkUrlInterval), s.active = !1
        }, s.checkUrl = function () {
            var e = s.getFragment();
            return e === s.fragment && s.iframe && (e = s.getFragment(s.getHash(s.iframe))), e === s.fragment ? !1 : (s.iframe && s.navigate(e, !1), void s.loadUrl())
        }, s.loadUrl = function (e) {
            var t = s.fragment = s.getFragment(e);
            return s.options.routeHandler ? s.options.routeHandler(t) : !1
        }, s.navigate = function (t, r) {
            if (!s.active)return !1;
            if (void 0 === r ? r = {trigger: !0} : e.isBoolean(r) && (r = {trigger: r}), t = s.getFragment(t || ""), s.fragment !== t) {
                s.fragment = t;
                var i = s.root + t;
                if ("" === t && "/" !== i && (i = i.slice(0, -1)), s._hasPushState)s.history[r.replace ? "replaceState" : "pushState"]({}, document.title, i); else {
                    if (!s._wantsHashChange)return s.location.assign(i);
                    n(s.location, t, r.replace), s.iframe && t !== s.getFragment(s.getHash(s.iframe)) && (r.replace || s.iframe.document.open().close(), n(s.iframe.location, t, r.replace))
                }
                return r.trigger ? s.loadUrl(t) : void 0
            }
        }, s.navigateBack = function () {
            s.history.back()
        }, s
    }), define("plugins/router", ["durandal/system", "durandal/app", "durandal/activator", "durandal/events", "durandal/composition", "plugins/history", "knockout", "jquery"], function (e, t, n, r, i, a, o, s) {
        function u(e) {
            return e = e.replace(y, "\\$&").replace(m, "(?:$1)?").replace(g, function (e, t) {
                return t ? e : "([^/]+)"
            }).replace(v, "(.*?)"), new RegExp("^" + e + "$", w ? void 0 : "i")
        }

        function c(e) {
            var t = e.indexOf(":"), n = t > 0 ? t - 1 : e.length;
            return e.substring(0, n)
        }

        function l(e, t) {
            return -1 !== e.indexOf(t, e.length - t.length)
        }

        function d(e, t) {
            if (!e || !t)return !1;
            if (e.length != t.length)return !1;
            for (var n = 0, r = e.length; r > n; n++)if (e[n] != t[n])return !1;
            return !0
        }

        function f(e) {
            return e.queryString ? e.fragment + "?" + e.queryString : e.fragment
        }

        var p, h, m = /\((.*?)\)/g, g = /(\(\?)?:\w+/g, v = /\*\w+/g, y = /[\-{}\[\]+?.,\\\^$|#\s]/g, b = /\/$/, w = !1, x = "/", S = "/", D = function () {
            function i(e, t) {
                return e.router && e.router.parent == t
            }

            function s(e) {
                I && I.config.isActive && I.config.isActive(e)
            }

            function m(t, n, r) {
                e.log("Navigation Complete", t, n);
                var a = e.getModuleId(P);
                a && _.trigger("router:navigation:from:" + a), P = t, s(!1), I = n, s(!0);
                var o = e.getModuleId(P);
                switch (o && _.trigger("router:navigation:to:" + o), i(t, _) || _.updateDocumentTitle(t, n), r) {
                    case"rootRouter":
                        x = f(I);
                        break;
                    case"rootRouterWithChild":
                        S = f(I);
                        break;
                    case"lastChildRouter":
                        x = S
                }
                h.explicitNavigation = !1, h.navigatingBack = !1, _.trigger("router:navigation:complete", t, n, _)
            }

            function v(t, n) {
                e.log("Navigation Cancelled"), _.activeInstruction(I), _.navigate(x, !1), q(!1), h.explicitNavigation = !1, h.navigatingBack = !1, _.trigger("router:navigation:cancelled", t, n, _)
            }

            function y(t) {
                e.log("Navigation Redirecting"), q(!1), h.explicitNavigation = !1, h.navigatingBack = !1, _.navigate(t, {
                    trigger: !0,
                    replace: !0
                })
            }

            function w(t, n, r) {
                h.navigatingBack = !h.explicitNavigation && P != r.fragment, _.trigger("router:route:activating", n, r, _);
                var a = {canDeactivate: !_.parent};
                t.activateItem(n, r.params, a).then(function (e) {
                    if (e) {
                        var a = P, o = i(n, _), s = "";
                        if (_.parent ? o || (s = "lastChildRouter") : s = o ? "rootRouterWithChild" : "rootRouter", m(n, r, s), o) {
                            n.router.trigger("router:route:before-child-routes", n, r, _);
                            var u = r.fragment;
                            r.queryString && (u += "?" + r.queryString), n.router.loadUrl(u)
                        }
                        a == n && (_.attached(), _.compositionComplete())
                    } else t.settings.lifecycleData && t.settings.lifecycleData.redirect ? y(t.settings.lifecycleData.redirect) : v(n, r);
                    p && (p.resolve(), p = null)
                }).fail(function (t) {
                    e.error(t)
                })
            }

            function R(t, n, r) {
                var i = _.guardRoute(n, r);
                i || "" === i ? i.then ? i.then(function (i) {
                    i ? e.isString(i) ? y(i) : w(t, n, r) : v(n, r)
                }) : e.isString(i) ? y(i) : w(t, n, r) : v(n, r)
            }

            function k(e, t, n) {
                _.guardRoute ? R(e, t, n) : w(e, t, n)
            }

            function C(e) {
                return I && I.config.moduleId == e.config.moduleId && P && (P.canReuseForRoute && P.canReuseForRoute.apply(P, e.params) || !P.canReuseForRoute && P.router && P.router.loadUrl)
            }

            function M() {
                if (!q()) {
                    var t = V.shift();
                    if (V = [], t)if (q(!0), _.activeInstruction(t), _.trigger("router:navigation:processing", t, _), C(t)) {
                        var r = n.create();
                        r.forceActiveItem(P), r.settings.areSameItem = N.settings.areSameItem, r.settings.findChildActivator = N.settings.findChildActivator, k(r, P, t)
                    } else t.config.moduleId ? e.acquire(t.config.moduleId).then(function (n) {
                        var r = e.resolveObject(n);
                        t.config.viewUrl && (r.viewUrl = t.config.viewUrl), k(N, r, t)
                    }).fail(function (n) {
                        e.error("Failed to load routed module (" + t.config.moduleId + "). Details: " + n.message, n)
                    }) : k(N, {
                        viewUrl: t.config.viewUrl, canReuseForRoute: function () {
                            return !0
                        }
                    }, t)
                }
            }

            function A(e) {
                V.unshift(e), M()
            }

            function O(e, t, n) {
                for (var r = e.exec(t).slice(1), i = 0; i < r.length; i++) {
                    var a = r[i];
                    r[i] = a ? decodeURIComponent(a) : null
                }
                var o = _.parseQueryString(n);
                return o && r.push(o), {params: r, queryParams: o}
            }

            function T(t) {
                _.trigger("router:route:before-config", t, _), e.isRegExp(t.route) ? t.routePattern = t.route : (t.title = t.title || _.convertRouteToTitle(t.route), t.viewUrl || (t.moduleId = t.moduleId || _.convertRouteToModuleId(t.route)), t.hash = t.hash || _.convertRouteToHash(t.route), t.hasChildRoutes && (t.route = t.route + "*childRoutes"), t.routePattern = u(t.route)), t.isActive = t.isActive || o.observable(!1), _.trigger("router:route:after-config", t, _), _.routes.push(t), _.route(t.routePattern, function (e, n) {
                    var r = O(t.routePattern, e, n);
                    A({fragment: e, queryString: n, config: t, params: r.params, queryParams: r.queryParams})
                })
            }

            function j(t) {
                if (e.isArray(t.route))for (var n = t.isActive || o.observable(!1), r = 0, i = t.route.length; i > r; r++) {
                    var a = e.extend({}, t);
                    a.route = t.route[r], a.isActive = n, r > 0 && delete a.nav, T(a)
                } else T(t);
                return _
            }

            function E(e) {
                var n = o.unwrap(t.title);
                document.title = n ? e + " | " + n : e
            }

            var P, I, V = [], q = o.observable(!1), N = n.create(), _ = {
                handlers: [],
                routes: [],
                navigationModel: o.observableArray([]),
                activeItem: N,
                isNavigating: o.computed(function () {
                    var e = N(), t = q(), n = e && e.router && e.router != _ && e.router.isNavigating() ? !0 : !1;
                    return t || n
                }),
                activeInstruction: o.observable(null),
                __router__: !0
            };
            r.includeIn(_), N.settings.areSameItem = function (e, t, n, r) {
                return e == t ? d(n, r) : !1
            }, N.settings.findChildActivator = function (e) {
                return e && e.router && e.router.parent == _ ? e.router.activeItem : null
            }, _.parseQueryString = function (t) {
                var n, r;
                if (!t)return null;
                if (r = t.split("&"), 0 == r.length)return null;
                n = {};
                for (var i = 0; i < r.length; i++) {
                    var a = r[i];
                    if ("" !== a) {
                        var o = a.split(/=(.+)?/), s = o[0], u = o[1] && decodeURIComponent(o[1].replace(/\+/g, " ")), c = n[s];
                        c ? e.isArray(c) ? c.push(u) : n[s] = [c, u] : n[s] = u
                    }
                }
                return n
            }, _.route = function (e, t) {
                _.handlers.push({routePattern: e, callback: t})
            }, _.loadUrl = function (t) {
                var n = _.handlers, r = null, i = t, o = t.indexOf("?");
                if (-1 != o && (i = t.substring(0, o), r = t.substr(o + 1)), _.relativeToParentRouter) {
                    var s = this.parent.activeInstruction();
                    i = -1 == o ? s.params.join("/") : s.params.slice(0, -1).join("/"), i && "/" == i.charAt(0) && (i = i.substr(1)), i || (i = ""), i = i.replace("//", "/").replace("//", "/")
                }
                i = i.replace(b, "");
                for (var u = 0; u < n.length; u++) {
                    var c = n[u];
                    if (c.routePattern.test(i))return c.callback(i, r), !0
                }
                return e.log("Route Not Found", t, I), _.trigger("router:route:not-found", t, _), _.parent && (x = S), a.navigate(x, {
                    trigger: !1,
                    replace: !0
                }), h.explicitNavigation = !1, h.navigatingBack = !1, !1
            };
            var L;
            return o.isObservable(t.title) && t.title.subscribe(function () {
                var e = _.activeInstruction(), t = null != e ? o.unwrap(e.config.title) : "";
                E(t)
            }), _.updateDocumentTitle = function (e, n) {
                var r = o.unwrap(t.title), i = n.config.title;
                L && L.dispose(), i ? o.isObservable(i) ? (L = i.subscribe(E), E(i())) : E(i) : r && (document.title = r)
            }, _.navigate = function (t, n) {
                return t && -1 != t.indexOf("://") ? (window.location.href = t, !0) : ((void 0 === n || e.isBoolean(n) && n || e.isObject(n) && n.trigger) && (h.explicitNavigation = !0), (e.isBoolean(n) && !n || n && void 0 != n.trigger && !n.trigger) && (x = t), a.navigate(t, n))
            }, _.navigateBack = function () {
                a.navigateBack()
            }, _.attached = function () {
                _.trigger("router:navigation:attached", P, I, _)
            }, _.compositionComplete = function () {
                q(!1), _.trigger("router:navigation:composition-complete", P, I, _), M()
            }, _.convertRouteToHash = function (e) {
                if (e = e.replace(/\*.*$/, ""), _.relativeToParentRouter) {
                    var t = _.parent.activeInstruction(), n = e ? t.config.hash + "/" + e : t.config.hash;
                    return a._hasPushState && (n = "/" + n), n = n.replace("//", "/").replace("//", "/")
                }
                return a._hasPushState ? e : "#" + e
            }, _.convertRouteToModuleId = function (e) {
                return c(e)
            }, _.convertRouteToTitle = function (e) {
                var t = c(e);
                return t.substring(0, 1).toUpperCase() + t.substring(1)
            }, _.map = function (t, n) {
                if (e.isArray(t)) {
                    for (var r = 0; r < t.length; r++)_.map(t[r]);
                    return _
                }
                return e.isString(t) || e.isRegExp(t) ? (n ? e.isString(n) && (n = {moduleId: n}) : n = {}, n.route = t) : n = t, j(n)
            }, _.buildNavigationModel = function (t) {
                for (var n = [], r = _.routes, i = t || 100, a = 0; a < r.length; a++) {
                    var o = r[a];
                    o.nav && (e.isNumber(o.nav) || (o.nav = ++i), n.push(o))
                }
                return n.sort(function (e, t) {
                    return e.nav - t.nav
                }), _.navigationModel(n), _
            }, _.mapUnknownRoutes = function (t, n) {
                var r = "*catchall", i = u(r);
                return _.route(i, function (o, s) {
                    var u = O(i, o, s), c = {
                        fragment: o,
                        queryString: s,
                        config: {route: r, routePattern: i},
                        params: u.params,
                        queryParams: u.queryParams
                    };
                    if (t)if (e.isString(t))c.config.moduleId = t, n && a.navigate(n, {
                        trigger: !1,
                        replace: !0
                    }); else if (e.isFunction(t)) {
                        var l = t(c);
                        if (l && l.then)return void l.then(function () {
                            _.trigger("router:route:before-config", c.config, _), _.trigger("router:route:after-config", c.config, _), A(c)
                        })
                    } else c.config = t, c.config.route = r, c.config.routePattern = i; else c.config.moduleId = o;
                    _.trigger("router:route:before-config", c.config, _), _.trigger("router:route:after-config", c.config, _), A(c)
                }), _
            }, _.reset = function () {
                return I = P = void 0, _.handlers = [], _.routes = [], _.off(), delete _.options, _
            }, _.makeRelative = function (t) {
                return e.isString(t) && (t = {
                    moduleId: t,
                    route: t
                }), t.moduleId && !l(t.moduleId, "/") && (t.moduleId += "/"), t.route && !l(t.route, "/") && (t.route += "/"), t.fromParent && (_.relativeToParentRouter = !0), _.on("router:route:before-config").then(function (e) {
                    t.moduleId && (e.moduleId = t.moduleId + e.moduleId), t.route && (e.route = "" === e.route ? t.route.substring(0, t.route.length - 1) : t.route + e.route)
                }), t.dynamicHash && (_.on("router:route:after-config").then(function (e) {
                    e.routePattern = u(e.route ? t.dynamicHash + "/" + e.route : t.dynamicHash), e.dynamicHash = e.dynamicHash || o.observable(e.hash)
                }), _.on("router:route:before-child-routes").then(function (e, t) {
                    for (var n = e.router, r = 0; r < n.routes.length; r++) {
                        var i = n.routes[r], a = t.params.slice(0);
                        i.hash = n.convertRouteToHash(i.route).replace(g, function (e) {
                            return a.length > 0 ? a.shift() : e
                        }), i.dynamicHash(i.hash)
                    }
                })), _
            }, _.createChildRouter = function () {
                var e = D();
                return e.parent = _, e
            }, _
        };
        return h = D(), h.explicitNavigation = !1, h.navigatingBack = !1, h.makeRoutesCaseSensitive = function () {
            w = !0
        }, h.targetIsThisWindow = function (e) {
            var t = s(e.target).attr("target");
            return !t || t === window.name || "_self" === t || "top" === t && window === window.top ? !0 : !1
        }, h.activate = function (t) {
            return e.defer(function (n) {
                if (p = n, h.options = e.extend({routeHandler: h.loadUrl}, h.options, t), a.activate(h.options), a._hasPushState)for (var r = h.routes, i = r.length; i--;) {
                    var o = r[i];
                    o.hash = o.hash.replace("#", "/")
                }
                var u = h.options.root && new RegExp("^" + h.options.root + "/");
                s(document).delegate("a", "click", function (e) {
                    if (a._hasPushState) {
                        if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && h.targetIsThisWindow(e)) {
                            var t = s(this).attr("href");
                            null == t || "#" === t.charAt(0) || /^[a-z]+:/i.test(t) || (h.explicitNavigation = !0, e.preventDefault(), u && (t = t.replace(u, "")), a.navigate(t))
                        }
                    } else h.explicitNavigation = !0
                }), a.options.silent && p && (p.resolve(), p = null)
            }).promise()
        }, h.deactivate = function () {
            a.deactivate()
        }, h.install = function () {
            o.bindingHandlers.router = {
                init: function () {
                    return {controlsDescendantBindings: !0}
                }, update: function (e, t, n, r, a) {
                    var s = o.utils.unwrapObservable(t()) || {};
                    if (s.__router__)s = {
                        model: s.activeItem(),
                        attached: s.attached,
                        compositionComplete: s.compositionComplete,
                        activate: !1
                    }; else {
                        var u = o.utils.unwrapObservable(s.router || r.router) || h;
                        s.model = u.activeItem(), s.attached = u.attached, s.compositionComplete = u.compositionComplete, s.activate = !1
                    }
                    i.compose(e, s, a)
                }
            }, o.virtualElements.allowedBindings.router = !0
        }, h
    }), define("viewmodels/home/error", ["require", "knockout", "plugins/router"], function (e, t, n) {
        function r(e) {
            a.status(e);
            var t = "";
            t = 0 === e ? "Brak po³¹czenia. SprawdŸ po³¹czenie sieciowe." : 404 == e ? "[404] ¯¹dana strona nie zosta³a odnaleziona." : 500 == e ? "[500] Wewnêtrzny b³¹d serwera." : 1 == e ? "Podano b³êdny identyfikator stacji." : "Nieokreœlony b³¹d.", a.details(t)
        }

        function i() {
            $("#try-again").click(function () {
                n.navigateBack()
            }), $("#try-home").click(function () {
                n.navigate("")
            })
        }

        var a = {activate: r, compositionComplete: i, status: t.observable(null), details: t.observable(null)};
        return a
    }), define("viewmodels/home/home", ["require", "knockout", "durandal/app", "openLayers", "maphilight", "plugins/router", "models/dynamicMapHydroObject", "models/dynamicMapMeteoObject", "models/area", "bootstrap", "moment", "numeral", "models/constants"], function (e, t, n, r, i, a, o, s, u, c, l, d, f) {
        function p(e, t, n, r, i, a) {
            return null != e && null != t && null != n && null != r && null != i && null != a && $.isNumeric(e) && $.isNumeric(t) && $.isNumeric(n) && $.isNumeric(a) ? !0 : {redirect: "map/19.5,51.5,7,true,true,0"}
        }

        function h(e, t, n, r, i, a) {
            E.longitude(parseFloat(e)), E.latitude(parseFloat(t)), E.zoom(parseInt(n)), E.showHydro("true" == r ? !0 : !1), E.showMeteo("true" == i ? !0 : !1), E.areaFilter(parseInt(a)), E.shouldShowInfo(!0), E.hydroLoaded() || $.getJSON("api/map/?category=hydro", function (e) {
                D(e), A()
            }), E.meteoLoaded() || $.getJSON("api/map/?category=meteo", function (e) {
                x(e), A()
            }), E.balticLoaded() || $.getJSON("api/map/?category=hydro&area=baltyk", function (e) {
                k(e), A()
            }), E.coordinatesLoaded() || $.getJSON("api/coordinates/?catchments", function (e) {
                E.areas = e, E.coordinatesLoaded(!0), A()
            }), A()
        }

        function m() {
            $(window).resize(y), $("#outlines_img").maphilight({
                strokeWidth: 4,
                strokeColor: "3A73B3",
                strokeOpacity: 1
            });
            var e = function (e) {
                $("#basins-map area").each(function () {
                    var t = $(this).data("maphilight") || {};
                    t.alwaysOn = e == this.id, $(this).data("maphilight", t).trigger("alwaysOn.maphilight")
                })
            };
            $("#baltyk-link").click(function (t) {
                t.preventDefault(), e(), g({
                    areaFilter: f.instance.catchmentCodes.baltyk,
                    longitude: 18.6211,
                    latitude: 54.0157,
                    zoom: 8
                })
            }), $("#basins-map area").click(function () {
                var t = this.id, n = f.instance.catchmentCodes[t], r = O(n), i = [(r[0][0] + r[1][0]) / 2, (r[0][1] + r[1][1]) / 2];
                e(t), g({areaFilter: n, longitude: i[0], latitude: i[1], zoom: 8})
            }), $("#reset_filter").click(function () {
                g({areaFilter: 0, longitude: 19.5, latitude: 51.5, zoom: 7}), e()
            });
            for (var t = 0; t < E.catchments.length; t++) {
                var n = E.catchments[t];
                if (f.instance.catchmentCodes[n.id] == E.areaFilter()) {
                    e(n.id);
                    break
                }
            }
            r.inherits(w, r.control.Control), r.inherits(b, r.control.Control), E.map(new r.Map({
                target: "map",
                layers: [new r.layer.Tile({source: new r.source.OSM}), E.areasLayer(), E.meteoLayer(), E.hydroLayer(), E.balticLayer()],
                view: new r.View({
                    center: r.proj.transform([E.longitude(), E.latitude()], "EPSG:4326", "EPSG:3857"),
                    zoom: E.zoom()
                }),
                controls: r.control.defaults({attributionOptions: {collapsible: !1}}).extend([new r.control.FullScreen, new w({category: "hydro"}), new w({category: "meteo"}), new b])
            })), E.map().on("moveend", j), E.map().on("click", function (e) {
                var t = E.map().forEachFeatureAtPixel(e.pixel, function (e) {
                    return e
                });
                t && (E.info().tooltip("hide"), E.shouldShowInfo(!1), a.navigate("station/" + t.get("category") + "/" + t.get("id")))
            }), E.info($("#info")), E.info().tooltip({animation: !1, trigger: "manual", html: !0});
            var i = $("#" + E.map().getTarget());
            $(E.map().getViewport()).on("mousemove", function (e) {
                var t = E.map().getEventPixel(e.originalEvent), n = E.map().forEachFeatureAtPixel(t, function (e) {
                    return null != e.get("category") ? e : !1
                });
                if (E.shouldShowInfo() && null != n) {
                    var r = n.getGeometry().getCoordinates(), a = E.map().getPixelFromCoordinate(r);
                    E.info().css({left: a[0] + "px", top: a[1] - 10 + "px"}), i.css("cursor", "pointer");
                    var o = n.get("name") + " (" + n.get("id") + ")";
                    "hydro" == n.get("category") ? (o += " - " + f.instance.hydroStatusLabels[n.get("state")], null != n.get("currentValue") && (o += "<br/>" + f.instance.currentWaterStateLabel + ": " + d(n.get("currentValue")).format("[00]0.[0]") + " cm (" + l.utc(n.get("currentDate")).format("YYYY-MM-DD HH:mm") + " UTC)")) : (o += " - " + f.instance.meteoStatusLabels[n.get("state")], ("precip" == n.get("state") || "high-precip" == n.get("state")) && (o += "<br/>" + f.instance.hourlyPrecipLabel + ": " + d(n.get("precipValue")).format("[00]0.[0]") + " mm (" + l.utc(n.get("precipDate")).format("YYYY-MM-DD HH:mm") + " UTC)")), E.info().tooltip("hide").attr("data-original-title", o).tooltip("fixTitle").tooltip("show")
                } else i.css("cursor", ""), E.info().tooltip("hide")
            }), y(), E.showHydro() && $("#show-hydro").addClass("map-button-active"), E.showMeteo() && $("#show-meteo").addClass("map-button-active")
        }

        function g(e) {
            var t = !1;
            null != e.longitude && E.longitude() !== e.longitude && (E.longitude(Math.round(1e4 * e.longitude) / 1e4), t = !0), null != e.latitude && E.latitude() !== e.latitude && (E.latitude(Math.round(1e4 * e.latitude) / 1e4), t = !0), null != e.zoom && E.zoom() !== e.zoom && (E.zoom(e.zoom), t = !0), null != e.showHydro && E.showHydro() !== e.showHydro && (E.showHydro(e.showHydro), t = !0), null != e.showMeteo && E.showMeteo() !== e.showMeteo && (E.showMeteo(e.showMeteo), t = !0), null != e.areaFilter && E.areaFilter() !== e.areaFilter && (E.areaFilter(e.areaFilter), t = !0), t && (v(), a.navigate("map/" + E.longitude() + "," + E.latitude() + "," + E.zoom() + "," + E.showHydro() + "," + E.showMeteo() + "," + E.areaFilter(), !1))
        }

        function v() {
            if (null != E.map()) {
                var e = E.map().getView(), t = r.animation.pan({duration: 1e3, source: e.getCenter()});
                E.map().beforeRender(t), e.setCenter(r.proj.transform([E.longitude(), E.latitude()], "EPSG:4326", "EPSG:3857")), e.setZoom(E.zoom()), E.meteoLayer().setVisible(E.showMeteo()), E.hydroLayer().setVisible(E.showHydro()), A(), E.map().renderSync()
            }
        }

        function y() {
            var e = $(window).height(), t = $(".navbar"), n = $("#footer"), r = e - t.outerHeight() - n.outerHeight();
            null != E.map() && ($("#map").css("height", r), E.map().updateSize())
        }

        function b(e) {
            var t = e || {}, n = document.createElement("a");
            n.href = "#basin-navigation", n.innerHTML = "Zlewnie";
            var i = function (e) {
                e.preventDefault(), E.hydroLoaded() && E.meteoLoaded() && E.balticLoaded() && ($("#basins-map-panel").appendTo("#basin-navigation"), $("#basins-map-panel").toggleClass("basins-map-panel-active"), $("#basin-navigation").toggleClass("basin-navigation-active"))
            };
            n.addEventListener("click", i, !1), n.addEventListener("touchstart", i, !1);
            var a = document.createElement("div");
            a.id = "basin-navigation", a.className = "toggle-stations ol-unselectable", a.appendChild(n), r.control.Control.call(this, {
                element: a,
                target: t.target
            })
        }

        function w(e) {
            var t = e || {}, n = document.createElement("a");
            n.href = "#toggle-" + t.category, n.innerHTML = "Stacje " + t.category;
            var i = function (e) {
                e.preventDefault(), $("#show-" + t.category).toggleClass("map-button-active"), "hydro" == t.category && g({showHydro: $("#show-hydro").hasClass("map-button-active")}), "meteo" == t.category && g({showMeteo: $("#show-meteo").hasClass("map-button-active")})
            };
            n.addEventListener("click", i, !1), n.addEventListener("touchstart", i, !1);
            var a = document.createElement("div");
            a.id = "show-" + t.category, a.className = "toggle-stations ol-unselectable", a.appendChild(n), r.control.Control.call(this, {
                element: a,
                target: t.target
            })
        }

        function x(e) {
            e.sort(function (e, t) {
                return S(t.s) - S(e.s)
            });
            var n = t.utils.arrayMap(e, function (e) {
                return new s(e.i, e.n, e.a, e.s, e.lo, e.la, e.pv, e.pd)
            });
            E.meteoStations.push.apply(E.meteoStations, n);
            for (var i = [], a = 0; a < E.meteoStations().length; a++)i.push(T(E.meteoStations()[a], "meteo"));
            var o = new r.source.Vector({features: i});
            null != E.meteoLayer().getSource() && E.meteoLayer().getSource().clear(), E.meteoLayer().setSource(o), E.meteoLoaded(!0), v()
        }

        function S(e) {
            switch (e) {
                case"high-precip":
                    return 1;
                case"precip":
                    return 2;
                case"no-precip":
                    return 3;
                case"no-precip-hours-data":
                    return 4;
                case"no-precip-data":
                    return 5
            }
            return 6
        }

        function D(e) {
            e.sort(function (e, t) {
                return R(t.s) - R(e.s)
            });
            var n = t.utils.arrayMap(e, function (e) {
                return new o(e.i, e.n, e.a, e.s, e.lo, e.la, e.cv, e.cd)
            });
            E.hydroStations.push.apply(E.hydroStations, n);
            for (var i = [], a = 0; a < E.hydroStations().length; a++)i.push(T(E.hydroStations()[a], "hydro"));
            var s = new r.source.Vector({features: i});
            null != E.hydroLayer().getSource() && E.hydroLayer().getSource().clear(), E.hydroLayer().setSource(s), E.hydroLoaded(!0), v()
        }

        function R(e) {
            switch (e) {
                case"alarm":
                case"alarm-obs":
                    return 1;
                case"warning":
                case"warning-obs":
                    return 2;
                case"high":
                case"high-obs":
                    return 3;
                case"normal":
                case"normal-obs":
                    return 4;
                case"low":
                case"low-obs":
                    return 5;
                case"unknow":
                    return 6;
                case"no-data":
                    return 7
            }
            return 8
        }

        function k(e) {
            e.sort(function (e, t) {
                return R(t.s) - R(e.s)
            });
            var n = t.utils.arrayMap(e, function (e) {
                return new o(e.i, e.n, e.a, e.s, e.lo, e.la, e.cv, e.cd)
            });
            E.balticStations.push.apply(E.balticStations, n);
            for (var i = [], a = 0; a < E.balticStations().length; a++)i.push(T(E.balticStations()[a], "hydro"));
            var s = new r.source.Vector({features: i});
            null != E.balticLayer().getSource() && E.balticLayer().getSource().clear(), E.balticLayer().setSource(s), E.balticLoaded(!0), v()
        }

        function C(e, t, n) {
            return new r.style.Style({
                image: new r.style.Icon({
                    anchor: [.5, .5],
                    anchorXUnits: "fraction",
                    anchorYUnits: "fraction",
                    opacity: n ? 1 : 0,
                    src: "Content/images/maps/state/" + e + "/" + t + ".png"
                })
            })
        }

        function M(e) {
            var t = E.areaFilter(), n = e.getSource();
            null != n && n.forEachFeature(function (e) {
                e.setStyle(0 == t || e.get("area") == t ? C(e.get("category"), e.get("state"), !0) : C(e.get("category"), e.get("state"), !1))
            })
        }

        function A() {
            var e = null, t = E.areaFilter();
            if (0 == t) {
                $("#active_filter").text(""), $("#reset_filter").hide();
                var n = new r.source.Vector;
                E.areasLayer().setSource(n)
            } else {
                for (var i = 0; i < E.catchments.length; i++) {
                    var a = E.catchments[i];
                    if (f.instance.catchmentCodes[a.id] == t) {
                        e = a;
                        break
                    }
                }
                if ($("#active_filter").text("Filtr: " + (null != e ? e.name : "")), $("#reset_filter").show(), null != E.areas)for (var i = 0; i < E.areas.length; i++) {
                    var o = E.areas[i];
                    if (null != e && o.n.toLowerCase() == e.id) {
                        for (var s = [[179, 89], [179, -89], [-179, -89], [-179, 89]], u = [], i = 0; i < o.p.length; i++)u.push([o.p[i].x, o.p[i].y]);
                        var c = new r.geom.Polygon([s, u]);
                        c.transform("EPSG:4326", "EPSG:3857");
                        var l = new r.Feature(c), n = new r.source.Vector;
                        n.addFeature(l), E.areasLayer().setSource(n);
                        break
                    }
                }
            }
            if (t === f.instance.catchmentCodes.baltyk) {
                var n = new r.source.Vector;
                E.areasLayer().setSource(n), E.balticLayer().setVisible(E.showHydro())
            } else E.balticLayer().setVisible(!1);
            M(E.hydroLayer()), M(E.meteoLayer())
        }

        function O(e) {
            var t = [180, 90], n = [0, 0], r = function (r) {
                if (r.get("area") == e) {
                    var i = r.getGeometry().clone().transform("EPSG:3857", "EPSG:4326").getExtent();
                    i[0] > n[0] && (n[0] = i[0]), i[0] < t[0] && (t[0] = i[0]), i[1] > n[1] && (n[1] = i[1]), i[1] < t[1] && (t[1] = i[1])
                }
            }, i = E.hydroLayer().getSource();
            null != i && i.forEachFeature(r);
            var a = E.meteoLayer().getSource();
            return null != a && a.forEachFeature(r), [t, n]
        }

        function T(e, t) {
            var n = {
                geometry: new r.geom.Point(r.proj.transform([e.longitude(), e.latitude()], "EPSG:4326", "EPSG:3857")),
                id: e.id(),
                name: e.name(),
                category: t,
                area: e.area(),
                state: e.state()
            };
            "meteo" == t && null != e.precipValue() && (n.precipValue = e.precipValue(), n.precipDate = e.precipDate()), "hydro" == t && (n.currentValue = e.currentValue(), n.currentDate = e.currentDate());
            var i = new r.Feature(n);
            return i.setStyle(C(t, e.state(), !0)), i
        }

        function j() {
            var e = E.map().getView().getCenter(), t = r.proj.transform(e, E.map().getView().getProjection(), "EPSG:4326"), n = E.map().getView().getZoom();
            g({longitude: t[0], latitude: t[1], zoom: n})
        }

        var E = {
            displayName: "Mapa",
            map: t.observable(null),
            info: t.observable(null),
            shouldShowInfo: t.observable(!0),
            longitude: t.observable(),
            latitude: t.observable(),
            zoom: t.observable(),
            showHydro: t.observable(),
            showMeteo: t.observable(),
            areaFilter: t.observable(),
            hydroStations: t.observableArray([]),
            meteoStations: t.observableArray([]),
            balticStations: t.observableArray([]),
            hydroLoaded: t.observable(!1),
            meteoLoaded: t.observable(!1),
            balticLoaded: t.observable(!1),
            coordinatesLoaded: t.observable(!1),
            hydroLayer: t.observable(new r.layer.Vector),
            meteoLayer: t.observable(new r.layer.Vector),
            areasLayer: t.observable(new r.layer.Vector),
            balticLayer: t.observable(new r.layer.Vector),
            canActivate: p,
            activate: h,
            compositionComplete: m,
            loadDataPromise: null,
            areas: null,
            catchments: [{
                id: "san",
                name: "San",
                coords: "236,251,229,247,222,246,216,242,213,240,208,232,204,227,202,221,199,217,207,212,208,204,214,202,216,199,212,194,212,189,210,184,211,180,221,180,227,178,232,184,234,187,241,188,246,192,248,197,248,201,241,212,229,228,232,231,233,237,234,243,234,244,238,246,238,251,237,251"
            }, {
                id: "wisla_do_sanu",
                name: "Górna Wis³a",
                coords: "207,236,202,234,197,236,193,234,191,236,187,236,184,242,177,238,173,237,167,239,162,241,160,247,155,245,153,247,149,246,150,237,145,235,142,230,139,234,135,237,128,238,128,234,124,233,124,227,120,219,123,216,118,214,120,212,123,213,125,209,124,207,130,204,127,201,129,198,125,197,129,191,135,189,143,193,146,195,152,195,156,195,155,192,155,187,152,182,157,179,164,175,165,170,166,170,168,170,172,170,179,172,180,175,185,177,192,179,198,181,202,181,205,182,208,187,209,191,208,194,210,199,206,201,204,202,202,207,202,210,199,214,195,214,196,219,199,222,202,226,203,232,207,234"
            }, {
                id: "warta_do_welny",
                name: "Warta do We³ny",
                coords: "142,191,134,187,118,181,116,179,117,172,106,163,103,162,102,156,105,150,101,141,95,135,92,131,78,134,76,132,69,131,69,123,66,118,59,110,61,108,67,111,71,112,76,110,77,106,78,103,80,102,82,107,87,107,88,110,93,108,97,110,103,113,109,111,115,115,125,116,129,117,131,123,134,133,136,139,143,139,144,141,140,145,144,150,140,152,142,165,145,166,145,172,145,177,142,182,142,183,139,184,142,192"
            }, {
                id: "odra_do_bobru",
                name: "Górna i œrodkowa Odra",
                coords: "121,224,119,219,118,214,110,214,104,211,98,214,93,206,97,203,95,199,84,200,75,193,74,197,78,203,66,209,54,193,61,187,56,184,48,187,34,177,28,168,30,161,28,153,26,147,30,140,33,134,29,127,33,123,36,117,43,115,44,112,48,123,51,127,59,128,65,125,66,124,65,133,71,135,77,136,86,137,91,135,95,142,101,148,100,152,97,157,101,164,108,170,112,171,113,176,112,180,120,184,127,185,131,188,125,192,124,196,125,203,121,205,122,209,118,209,118,213,118,215"
            }, {
                id: "wisla_od_sanu_do_narwi",
                name: "Wis³a od Sanu do Narwi",
                coords: "155,194,145,192,142,187,148,182,149,175,147,170,150,167,147,162,146,157,144,155,147,153,147,149,145,145,148,141,152,141,162,145,170,144,173,135,181,127,184,122,181,117,189,119,197,120,199,119,199,125,207,128,224,135,230,132,229,137,234,138,236,142,237,151,238,156,241,155,242,158,241,160,243,165,249,168,251,172,248,177,246,180,247,187,234,183,229,175,227,175,221,178,209,179,204,180,194,177,186,175,180,172,175,167,168,167,162,168,160,175,152,179,150,181,152,187,154,193"
            }, {
                id: "bug",
                name: "Bug",
                coords: "251,198,247,189,249,183,250,178,254,173,251,167,246,163,244,161,245,157,244,152,241,151,240,147,241,143,238,139,237,135,234,135,234,130,227,129,222,130,203,121,203,115,200,111,195,108,192,106,188,104,209,90,209,88,214,89,220,88,225,92,232,93,234,97,240,100,244,102,239,113,248,117,254,123,250,139,254,147,254,155,261,162,264,167,270,171,268,175,264,175,267,180,267,192,261,192,257,194,255,197,252,198"
            }, {
                id: "bzura-drweca",
                name: "Wis³a od Narwi do Drwêcy",
                coords: "166,141,158,141,153,137,148,137,145,135,137,135,137,130,136,128,133,118,132,113,130,109,124,109,120,107,120,102,123,100,122,96,114,94,119,94,122,90,124,84,123,81,125,77,125,73,129,77,135,77,142,76,139,71,138,68,143,68,145,59,145,54,146,50,148,48,152,49,155,58,158,61,155,65,157,70,155,73,150,74,147,80,149,88,149,95,152,95,153,100,154,105,164,109,171,111,177,116,180,122,172,129,169,129,170,135,166,140"
            }, {
                id: "odra_od_bobru_do_warty",
                name: "Odra od Bobru do Warty",
                coords: "27,170,25,169,24,174,17,173,21,166,24,157,22,147,17,145,16,139,14,132,16,127,17,122,16,115,13,110,15,102,22,99,25,97,31,96,31,90,32,89,33,91,35,91,35,96,38,98,41,98,51,98,59,98,67,95,72,93,72,87,78,90,84,90,90,90,93,96,97,100,96,105,95,105,94,103,88,102,85,104,82,101,82,98,78,98,74,100,73,101,73,104,73,108,70,109,67,106,63,104,61,103,57,103,56,105,56,109,57,114,60,117,63,118,63,122,58,124,53,123,51,122,49,115,48,112,46,110,42,109,41,110,37,113,33,114,32,119,28,123,26,125,28,132,28,136,26,140,25,145,26,150,27,156,28,160,28,167"
            }, {
                id: "notec",
                name: "Noteæ",
                coords: "123,113,115,110,110,107,107,108,101,107,99,105,100,103,100,99,98,95,94,91,95,88,93,85,88,85,85,86,80,87,71,84,68,86,68,90,63,93,56,94,48,95,42,95,39,94,39,90,36,87,40,86,45,82,48,78,48,75,47,74,46,71,47,68,52,62,55,58,58,57,62,60,68,58,72,56,73,52,72,48,74,46,78,46,79,50,81,55,82,58,86,60,88,62,88,66,88,70,94,68,94,73,95,77,99,78,99,81,104,86,110,92,112,97,117,98,118,98,118,100,118,104,114,105,115,110,120,110,122,112"
            }, {
                id: "ujscie_wisly",
                name: "Ujœcie Wis³y",
                coords: "116,91,110,89,108,85,103,80,101,75,95,74,98,68,96,66,92,66,90,61,86,56,82,47,89,43,95,41,99,39,103,37,108,38,113,37,115,41,116,44,120,45,120,42,124,43,125,48,123,56,123,61,123,64,128,63,134,58,137,61,141,58,142,61,141,65,138,66,136,66,134,69,135,72,135,74,130,73,127,70,122,71,120,76,120,84,118,90"
            }, {
                id: "narew_bez_bugu",
                name: "Narew",
                coords: "199,117,191,117,183,115,182,111,179,109,170,107,162,105,157,103,156,101,155,95,155,93,152,92,151,80,152,77,160,76,160,70,166,69,169,68,170,63,174,65,178,61,180,57,183,53,186,55,189,56,191,48,195,45,197,43,204,43,208,43,207,37,210,36,213,38,216,37,219,35,223,37,229,43,236,49,241,54,244,60,244,66,246,70,246,76,251,80,255,85,255,93,254,95,250,94,248,88,242,91,243,98,237,95,233,89,227,88,224,85,215,85,207,85,202,90,195,95,189,100,186,104,189,108,193,110,198,112,199,115,199,114"
            }, {
                id: "zalew_wislany",
                name: "Zalew Wiœlany",
                coords: "173,58,165,58,165,66,160,66,161,63,161,59,159,55,155,43,145,42,142,46,140,51,140,55,137,56,134,55,128,59,125,59,129,52,128,46,126,41,129,35,130,31,132,29,145,24,158,26,180,28,198,28,214,27,225,26,224,31,220,32,217,29,214,33,211,33,204,36,205,41,199,38,196,40,189,41,189,44,188,51,186,50,185,45,182,45,180,50,176,52,174,58"
            }, {
                id: "przymorze",
                name: "Przymorze",
                coords: "122,38,118,36,115,33,110,33,104,34,101,33,94,36,90,39,81,41,78,43,69,46,67,51,68,53,62,56,59,53,54,53,52,55,49,61,46,64,45,61,42,62,40,61,38,59,36,58,33,60,33,54,35,49,36,44,35,41,33,41,29,40,29,38,37,35,43,35,51,33,56,32,61,28,66,23,71,19,77,19,87,13,97,10,105,9,114,9,119,12,120,22,123,29,127,30,127,33,125,37,123,38"
            }, {
                id: "ujscie_odry",
                name: "Ujœcie Odry",
                coords: "28,94,24,93,20,92,19,97,16,98,13,94,8,89,6,87,6,83,10,82,14,75,14,69,11,57,11,46,10,42,16,43,19,41,23,40,26,38,28,38,31,43,33,44,31,51,31,57,31,62,33,63,36,62,38,61,41,65,44,66,43,71,43,75,43,78,39,82,35,83,32,85,28,87,28,90"
            }, {id: "baltyk", name: "Ba³tyk", coords: "0,0"}]
        };
        return E
    }), function () {
        var e, t, n, r, i, a, o, s, u, c, l, d, f, p, h, m, g, v, y, b, w, x, S, D, R, k, C, M, A, O, T, j, E, P, I, V, q, N, _, L, H, W, F, B, U, $, z, Q, Y, X = [].slice, J = {}.hasOwnProperty, G = function (e, t) {
            function n() {
                this.constructor = e
            }

            for (var r in t)J.call(t, r) && (e[r] = t[r]);
            return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
        }, K = [].indexOf || function (e) {
                for (var t = 0, n = this.length; n > t; t++)if (t in this && this[t] === e)return t;
                return -1
            };
        for (w = {
            catchupTime: 100,
            initialRate: .03,
            minTime: 250,
            ghostTime: 100,
            maxProgressPerFrame: 20,
            easeFactor: 1.25,
            startOnPageLoad: !0,
            restartOnPushState: !0,
            restartOnRequestAfter: 500,
            target: "body",
            elements: {checkInterval: 100, selectors: ["body"]},
            eventLag: {minSamples: 10, sampleCount: 3, lagThreshold: 3},
            ajax: {trackMethods: ["GET"], trackWebSockets: !0, ignoreURLs: []}
        }, A = function () {
            var e;
            return null != (e = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? e : +new Date
        }, T = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, b = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == T && (T = function (e) {
            return setTimeout(e, 50)
        }, b = function (e) {
            return clearTimeout(e)
        }), E = function (e) {
            var t, n;
            return t = A(), (n = function () {
                var r;
                return r = A() - t, r >= 33 ? (t = A(), e(r, function () {
                    return T(n)
                })) : setTimeout(n, 33 - r)
            })()
        }, j = function () {
            var e, t, n;
            return n = arguments[0], t = arguments[1], e = 3 <= arguments.length ? X.call(arguments, 2) : [], "function" == typeof n[t] ? n[t].apply(n, e) : n[t]
        }, x = function () {
            var e, t, n, r, i, a, o;
            for (t = arguments[0], r = 2 <= arguments.length ? X.call(arguments, 1) : [], a = 0, o = r.length; o > a; a++)if (n = r[a])for (e in n)J.call(n, e) && (i = n[e], null != t[e] && "object" == typeof t[e] && null != i && "object" == typeof i ? x(t[e], i) : t[e] = i);
            return t
        }, g = function (e) {
            var t, n, r, i, a;
            for (n = t = 0, i = 0, a = e.length; a > i; i++)r = e[i], n += Math.abs(r), t++;
            return n / t
        }, D = function (e, t) {
            var n, r, i;
            if (null == e && (e = "options"), null == t && (t = !0), i = document.querySelector("[data-pace-" + e + "]")) {
                if (n = i.getAttribute("data-pace-" + e), !t)return n;
                try {
                    return JSON.parse(n)
                } catch (a) {
                    return r = a, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", r) : void 0
                }
            }
        }, o = function () {
            function e() {
            }

            return e.prototype.on = function (e, t, n, r) {
                var i;
                return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (i = this.bindings)[e] && (i[e] = []), this.bindings[e].push({
                    handler: t,
                    ctx: n,
                    once: r
                })
            }, e.prototype.once = function (e, t, n) {
                return this.on(e, t, n, !0)
            }, e.prototype.off = function (e, t) {
                var n, r, i;
                if (null != (null != (r = this.bindings) ? r[e] : void 0)) {
                    if (null == t)return delete this.bindings[e];
                    for (n = 0, i = []; n < this.bindings[e].length;)i.push(this.bindings[e][n].handler === t ? this.bindings[e].splice(n, 1) : n++);
                    return i
                }
            }, e.prototype.trigger = function () {
                var e, t, n, r, i, a, o, s, u;
                if (n = arguments[0], e = 2 <= arguments.length ? X.call(arguments, 1) : [], null != (o = this.bindings) ? o[n] : void 0) {
                    for (i = 0, u = []; i < this.bindings[n].length;)s = this.bindings[n][i], r = s.handler, t = s.ctx, a = s.once, r.apply(null != t ? t : this, e), u.push(a ? this.bindings[n].splice(i, 1) : i++);
                    return u
                }
            }, e
        }(), c = window.Pace || {}, window.Pace = c, x(c, o.prototype), O = c.options = x({}, w, window.paceOptions, D()), z = ["ajax", "document", "eventLag", "elements"], F = 0, U = z.length; U > F; F++)q = z[F], O[q] === !0 && (O[q] = w[q]);
        u = function (e) {
            function t() {
                return Q = t.__super__.constructor.apply(this, arguments)
            }

            return G(t, e), t
        }(Error), t = function () {
            function e() {
                this.progress = 0
            }

            return e.prototype.getElement = function () {
                var e;
                if (null == this.el) {
                    if (e = document.querySelector(O.target), !e)throw new u;
                    this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != e.firstChild ? e.insertBefore(this.el, e.firstChild) : e.appendChild(this.el)
                }
                return this.el
            }, e.prototype.finish = function () {
                var e;
                return e = this.getElement(), e.className = e.className.replace("pace-active", ""), e.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
            }, e.prototype.update = function (e) {
                return this.progress = e, this.render()
            }, e.prototype.destroy = function () {
                try {
                    this.getElement().parentNode.removeChild(this.getElement())
                } catch (e) {
                    u = e
                }
                return this.el = void 0
            }, e.prototype.render = function () {
                var e, t, n, r, i, a, o;
                if (null == document.querySelector(O.target))return !1;
                for (e = this.getElement(), r = "translate3d(" + this.progress + "%, 0, 0)", o = ["webkitTransform", "msTransform", "transform"], i = 0, a = o.length; a > i; i++)t = o[i], e.children[0].style[t] = r;
                return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (e.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), e.children[0].setAttribute("data-progress", "" + n)), this.lastRenderedProgress = this.progress
            }, e.prototype.done = function () {
                return this.progress >= 100
            }, e
        }(), s = function () {
            function e() {
                this.bindings = {}
            }

            return e.prototype.trigger = function (e, t) {
                var n, r, i, a, o;
                if (null != this.bindings[e]) {
                    for (a = this.bindings[e], o = [], r = 0, i = a.length; i > r; r++)n = a[r], o.push(n.call(this, t));
                    return o
                }
            }, e.prototype.on = function (e, t) {
                var n;
                return null == (n = this.bindings)[e] && (n[e] = []), this.bindings[e].push(t)
            }, e
        }(), W = window.XMLHttpRequest, H = window.XDomainRequest, L = window.WebSocket, S = function (e, t) {
            var n, r, i, a;
            a = [];
            for (r in t.prototype)try {
                i = t.prototype[r], a.push(null == e[r] && "function" != typeof i ? e[r] = i : void 0)
            } catch (o) {
                n = o
            }
            return a
        }, C = [], c.ignore = function () {
            var e, t, n;
            return t = arguments[0], e = 2 <= arguments.length ? X.call(arguments, 1) : [], C.unshift("ignore"), n = t.apply(null, e), C.shift(), n
        }, c.track = function () {
            var e, t, n;
            return t = arguments[0], e = 2 <= arguments.length ? X.call(arguments, 1) : [], C.unshift("track"), n = t.apply(null, e), C.shift(), n
        }, V = function (e) {
            var t;
            if (null == e && (e = "GET"), "track" === C[0])return "force";
            if (!C.length && O.ajax) {
                if ("socket" === e && O.ajax.trackWebSockets)return !0;
                if (t = e.toUpperCase(), K.call(O.ajax.trackMethods, t) >= 0)return !0
            }
            return !1
        }, l = function (e) {
            function t() {
                var e, n = this;
                t.__super__.constructor.apply(this, arguments), e = function (e) {
                    var t;
                    return t = e.open, e.open = function (r, i) {
                        return V(r) && n.trigger("request", {type: r, url: i, request: e}), t.apply(e, arguments)
                    }
                }, window.XMLHttpRequest = function (t) {
                    var n;
                    return n = new W(t), e(n), n
                };
                try {
                    S(window.XMLHttpRequest, W)
                } catch (r) {
                }
                if (null != H) {
                    window.XDomainRequest = function () {
                        var t;
                        return t = new H, e(t), t
                    };
                    try {
                        S(window.XDomainRequest, H)
                    } catch (r) {
                    }
                }
                if (null != L && O.ajax.trackWebSockets) {
                    window.WebSocket = function (e, t) {
                        var r;
                        return r = null != t ? new L(e, t) : new L(e), V("socket") && n.trigger("request", {
                            type: "socket",
                            url: e,
                            protocols: t,
                            request: r
                        }), r
                    };
                    try {
                        S(window.WebSocket, L)
                    } catch (r) {
                    }
                }
            }

            return G(t, e), t
        }(s), B = null, R = function () {
            return null == B && (B = new l), B
        }, I = function (e) {
            var t, n, r, i;
            for (i = O.ajax.ignoreURLs, n = 0, r = i.length; r > n; n++)if (t = i[n], "string" == typeof t) {
                if (-1 !== e.indexOf(t))return !0
            } else if (t.test(e))return !0;
            return !1
        }, R().on("request", function (t) {
            var n, r, i, a, o;
            return a = t.type, i = t.request, o = t.url, I(o) ? void 0 : c.running || O.restartOnRequestAfter === !1 && "force" !== V(a) ? void 0 : (r = arguments, n = O.restartOnRequestAfter || 0, "boolean" == typeof n && (n = 0), setTimeout(function () {
                var t, n, o, s, u, l;
                if (t = "socket" === a ? i.readyState < 2 : 0 < (s = i.readyState) && 4 > s) {
                    for (c.restart(), u = c.sources, l = [], n = 0, o = u.length; o > n; n++) {
                        if (q = u[n], q instanceof e) {
                            q.watch.apply(q, r);
                            break
                        }
                        l.push(void 0)
                    }
                    return l
                }
            }, n))
        }), e = function () {
            function e() {
                var e = this;
                this.elements = [], R().on("request", function () {
                    return e.watch.apply(e, arguments)
                })
            }

            return e.prototype.watch = function (e) {
                var t, n, r, i;
                return r = e.type, t = e.request, i = e.url, I(i) ? void 0 : (n = "socket" === r ? new p(t) : new h(t), this.elements.push(n))
            }, e
        }(), h = function () {
            function e(e) {
                var t, n, r, i, a, o, s = this;
                if (this.progress = 0, null != window.ProgressEvent)for (n = null, e.addEventListener("progress", function (e) {
                    return s.progress = e.lengthComputable ? 100 * e.loaded / e.total : s.progress + (100 - s.progress) / 2
                }, !1), o = ["load", "abort", "timeout", "error"], r = 0, i = o.length; i > r; r++)t = o[r], e.addEventListener(t, function () {
                    return s.progress = 100
                }, !1); else a = e.onreadystatechange, e.onreadystatechange = function () {
                    var t;
                    return 0 === (t = e.readyState) || 4 === t ? s.progress = 100 : 3 === e.readyState && (s.progress = 50), "function" == typeof a ? a.apply(null, arguments) : void 0
                }
            }

            return e
        }(), p = function () {
            function e(e) {
                var t, n, r, i, a = this;
                for (this.progress = 0, i = ["error", "open"], n = 0, r = i.length; r > n; n++)t = i[n], e.addEventListener(t, function () {
                    return a.progress = 100
                }, !1)
            }

            return e
        }(), r = function () {
            function e(e) {
                var t, n, r, a;
                for (null == e && (e = {}), this.elements = [], null == e.selectors && (e.selectors = []), a = e.selectors, n = 0, r = a.length; r > n; n++)t = a[n], this.elements.push(new i(t))
            }

            return e
        }(), i = function () {
            function e(e) {
                this.selector = e, this.progress = 0, this.check()
            }

            return e.prototype.check = function () {
                var e = this;
                return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
                    return e.check()
                }, O.elements.checkInterval)
            }, e.prototype.done = function () {
                return this.progress = 100
            }, e
        }(), n = function () {
            function e() {
                var e, t, n = this;
                this.progress = null != (t = this.states[document.readyState]) ? t : 100, e = document.onreadystatechange, document.onreadystatechange = function () {
                    return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof e ? e.apply(null, arguments) : void 0
                }
            }

            return e.prototype.states = {loading: 0, interactive: 50, complete: 100}, e
        }(), a = function () {
            function e() {
                var e, t, n, r, i, a = this;
                this.progress = 0, e = 0, i = [], r = 0, n = A(), t = setInterval(function () {
                    var o;
                    return o = A() - n - 50, n = A(), i.push(o), i.length > O.eventLag.sampleCount && i.shift(), e = g(i), ++r >= O.eventLag.minSamples && e < O.eventLag.lagThreshold ? (a.progress = 100, clearInterval(t)) : a.progress = 100 * (3 / (e + 3))
                }, 50)
            }

            return e
        }(), f = function () {
            function e(e) {
                this.source = e, this.last = this.sinceLastUpdate = 0, this.rate = O.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = j(this.source, "progress"))
            }

            return e.prototype.tick = function (e, t) {
                var n;
                return null == t && (t = j(this.source, "progress")), t >= 100 && (this.done = !0), t === this.last ? this.sinceLastUpdate += e : (this.sinceLastUpdate && (this.rate = (t - this.last) / this.sinceLastUpdate), this.catchup = (t - this.progress) / O.catchupTime, this.sinceLastUpdate = 0, this.last = t), t > this.progress && (this.progress += this.catchup * e), n = 1 - Math.pow(this.progress / 100, O.easeFactor), this.progress += n * this.rate * e, this.progress = Math.min(this.lastProgress + O.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
            }, e
        }(), N = null, P = null, v = null, _ = null, m = null, y = null, c.running = !1, k = function () {
            return O.restartOnPushState ? c.restart() : void 0
        }, null != window.history.pushState && ($ = window.history.pushState, window.history.pushState = function () {
            return k(), $.apply(window.history, arguments)
        }), null != window.history.replaceState && (Y = window.history.replaceState, window.history.replaceState = function () {
            return k(), Y.apply(window.history, arguments)
        }), d = {ajax: e, elements: r, document: n, eventLag: a}, (M = function () {
            var e, n, r, i, a, o, s, u;
            for (c.sources = N = [], o = ["ajax", "elements", "document", "eventLag"], n = 0, i = o.length; i > n; n++)e = o[n], O[e] !== !1 && N.push(new d[e](O[e]));
            for (u = null != (s = O.extraSources) ? s : [], r = 0, a = u.length; a > r; r++)q = u[r], N.push(new q(O));
            return c.bar = v = new t, P = [], _ = new f
        })(), c.stop = function () {
            return c.trigger("stop"), c.running = !1, v.destroy(), y = !0, null != m && ("function" == typeof b && b(m), m = null), M()
        }, c.restart = function () {
            return c.trigger("restart"), c.stop(), c.start()
        }, c.go = function () {
            var e;
            return c.running = !0, v.render(), e = A(), y = !1, m = E(function (t, n) {
                var r, i, a, o, s, u, l, d, p, h, m, g, b, w, x, S;
                for (d = 100 - v.progress, i = m = 0, a = !0, u = g = 0, w = N.length; w > g; u = ++g)for (q = N[u], h = null != P[u] ? P[u] : P[u] = [], s = null != (S = q.elements) ? S : [q], l = b = 0, x = s.length; x > b; l = ++b)o = s[l], p = null != h[l] ? h[l] : h[l] = new f(o), a &= p.done, p.done || (i++, m += p.tick(t));
                return r = m / i, v.update(_.tick(t, r)), v.done() || a || y ? (v.update(100), c.trigger("done"), setTimeout(function () {
                    return v.finish(), c.running = !1, c.trigger("hide")
                }, Math.max(O.ghostTime, Math.max(O.minTime - (A() - e), 0)))) : n()
            })
        }, c.start = function (e) {
            x(O, e), c.running = !0;
            try {
                v.render()
            } catch (t) {
                u = t
            }
            return document.querySelector(".pace") ? (c.trigger("start"), c.go()) : setTimeout(c.start, 50)
        }, "function" == typeof define && define.amd ? define("pace", [], function () {
            return c
        }) : "object" == typeof exports ? module.exports = c : O.startOnPageLoad && c.start()
    }.call(this), function () {
        var e = this, t = e._, n = Array.prototype, r = Object.prototype, i = Function.prototype, a = n.push, o = n.slice, s = n.concat, u = r.toString, c = r.hasOwnProperty, l = Array.isArray, d = Object.keys, f = i.bind, p = function (e) {
            return e instanceof p ? e : this instanceof p ? void(this._wrapped = e) : new p(e)
        };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = p), exports._ = p) : e._ = p, p.VERSION = "1.7.0";
        var h = function (e, t, n) {
            if (void 0 === t)return e;
            switch (null == n ? 3 : n) {
                case 1:
                    return function (n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function (n, r) {
                        return e.call(t, n, r)
                    };
                case 3:
                    return function (n, r, i) {
                        return e.call(t, n, r, i)
                    };
                case 4:
                    return function (n, r, i, a) {
                        return e.call(t, n, r, i, a)
                    }
            }
            return function () {
                return e.apply(t, arguments)
            }
        };
        p.iteratee = function (e, t, n) {
            return null == e ? p.identity : p.isFunction(e) ? h(e, t, n) : p.isObject(e) ? p.matches(e) : p.property(e)
        }, p.each = p.forEach = function (e, t, n) {
            if (null == e)return e;
            t = h(t, n);
            var r, i = e.length;
            if (i === +i)for (r = 0; i > r; r++)t(e[r], r, e); else {
                var a = p.keys(e);
                for (r = 0, i = a.length; i > r; r++)t(e[a[r]], a[r], e)
            }
            return e
        }, p.map = p.collect = function (e, t, n) {
            if (null == e)return [];
            t = p.iteratee(t, n);
            for (var r, i = e.length !== +e.length && p.keys(e), a = (i || e).length, o = Array(a), s = 0; a > s; s++)r = i ? i[s] : s, o[s] = t(e[r], r, e);
            return o
        };
        var m = "Reduce of empty array with no initial value";
        p.reduce = p.foldl = p.inject = function (e, t, n, r) {
            null == e && (e = []), t = h(t, r, 4);
            var i, a = e.length !== +e.length && p.keys(e), o = (a || e).length, s = 0;
            if (arguments.length < 3) {
                if (!o)throw new TypeError(m);
                n = e[a ? a[s++] : s++]
            }
            for (; o > s; s++)i = a ? a[s] : s, n = t(n, e[i], i, e);
            return n
        }, p.reduceRight = p.foldr = function (e, t, n, r) {
            null == e && (e = []), t = h(t, r, 4);
            var i, a = e.length !== +e.length && p.keys(e), o = (a || e).length;
            if (arguments.length < 3) {
                if (!o)throw new TypeError(m);
                n = e[a ? a[--o] : --o]
            }
            for (; o--;)i = a ? a[o] : o, n = t(n, e[i], i, e);
            return n
        }, p.find = p.detect = function (e, t, n) {
            var r;
            return t = p.iteratee(t, n), p.some(e, function (e, n, i) {
                return t(e, n, i) ? (r = e, !0) : void 0
            }), r
        }, p.filter = p.select = function (e, t, n) {
            var r = [];
            return null == e ? r : (t = p.iteratee(t, n), p.each(e, function (e, n, i) {
                t(e, n, i) && r.push(e)
            }), r)
        }, p.reject = function (e, t, n) {
            return p.filter(e, p.negate(p.iteratee(t)), n)
        }, p.every = p.all = function (e, t, n) {
            if (null == e)return !0;
            t = p.iteratee(t, n);
            var r, i, a = e.length !== +e.length && p.keys(e), o = (a || e).length;
            for (r = 0; o > r; r++)if (i = a ? a[r] : r, !t(e[i], i, e))return !1;
            return !0
        }, p.some = p.any = function (e, t, n) {
            if (null == e)return !1;
            t = p.iteratee(t, n);
            var r, i, a = e.length !== +e.length && p.keys(e), o = (a || e).length;
            for (r = 0; o > r; r++)if (i = a ? a[r] : r, t(e[i], i, e))return !0;
            return !1
        }, p.contains = p.include = function (e, t) {
            return null == e ? !1 : (e.length !== +e.length && (e = p.values(e)), p.indexOf(e, t) >= 0)
        }, p.invoke = function (e, t) {
            var n = o.call(arguments, 2), r = p.isFunction(t);
            return p.map(e, function (e) {
                return (r ? t : e[t]).apply(e, n)
            })
        }, p.pluck = function (e, t) {
            return p.map(e, p.property(t))
        }, p.where = function (e, t) {
            return p.filter(e, p.matches(t))
        }, p.findWhere = function (e, t) {
            return p.find(e, p.matches(t))
        }, p.max = function (e, t, n) {
            var r, i, a = -1 / 0, o = -1 / 0;
            if (null == t && null != e) {
                e = e.length === +e.length ? e : p.values(e);
                for (var s = 0, u = e.length; u > s; s++)r = e[s], r > a && (a = r)
            } else t = p.iteratee(t, n), p.each(e, function (e, n, r) {
                i = t(e, n, r), (i > o || i === -1 / 0 && a === -1 / 0) && (a = e, o = i)
            });
            return a
        }, p.min = function (e, t, n) {
            var r, i, a = 1 / 0, o = 1 / 0;
            if (null == t && null != e) {
                e = e.length === +e.length ? e : p.values(e);
                for (var s = 0, u = e.length; u > s; s++)r = e[s], a > r && (a = r)
            } else t = p.iteratee(t, n), p.each(e, function (e, n, r) {
                i = t(e, n, r), (o > i || 1 / 0 === i && 1 / 0 === a) && (a = e, o = i)
            });
            return a
        }, p.shuffle = function (e) {
            for (var t, n = e && e.length === +e.length ? e : p.values(e), r = n.length, i = Array(r), a = 0; r > a; a++)t = p.random(0, a), t !== a && (i[a] = i[t]), i[t] = n[a];
            return i
        }, p.sample = function (e, t, n) {
            return null == t || n ? (e.length !== +e.length && (e = p.values(e)), e[p.random(e.length - 1)]) : p.shuffle(e).slice(0, Math.max(0, t))
        }, p.sortBy = function (e, t, n) {
            return t = p.iteratee(t, n), p.pluck(p.map(e, function (e, n, r) {
                return {value: e, index: n, criteria: t(e, n, r)}
            }).sort(function (e, t) {
                var n = e.criteria, r = t.criteria;
                if (n !== r) {
                    if (n > r || void 0 === n)return 1;
                    if (r > n || void 0 === r)return -1
                }
                return e.index - t.index
            }), "value")
        };
        var g = function (e) {
            return function (t, n, r) {
                var i = {};
                return n = p.iteratee(n, r), p.each(t, function (r, a) {
                    var o = n(r, a, t);
                    e(i, r, o)
                }), i
            }
        };
        p.groupBy = g(function (e, t, n) {
            p.has(e, n) ? e[n].push(t) : e[n] = [t]
        }), p.indexBy = g(function (e, t, n) {
            e[n] = t
        }), p.countBy = g(function (e, t, n) {
            p.has(e, n) ? e[n]++ : e[n] = 1
        }), p.sortedIndex = function (e, t, n, r) {
            n = p.iteratee(n, r, 1);
            for (var i = n(t), a = 0, o = e.length; o > a;) {
                var s = a + o >>> 1;
                n(e[s]) < i ? a = s + 1 : o = s
            }
            return a
        }, p.toArray = function (e) {
            return e ? p.isArray(e) ? o.call(e) : e.length === +e.length ? p.map(e, p.identity) : p.values(e) : []
        }, p.size = function (e) {
            return null == e ? 0 : e.length === +e.length ? e.length : p.keys(e).length
        }, p.partition = function (e, t, n) {
            t = p.iteratee(t, n);
            var r = [], i = [];
            return p.each(e, function (e, n, a) {
                (t(e, n, a) ? r : i).push(e)
            }), [r, i]
        }, p.first = p.head = p.take = function (e, t, n) {
            return null == e ? void 0 : null == t || n ? e[0] : 0 > t ? [] : o.call(e, 0, t)
        }, p.initial = function (e, t, n) {
            return o.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
        }, p.last = function (e, t, n) {
            return null == e ? void 0 : null == t || n ? e[e.length - 1] : o.call(e, Math.max(e.length - t, 0))
        }, p.rest = p.tail = p.drop = function (e, t, n) {
            return o.call(e, null == t || n ? 1 : t)
        }, p.compact = function (e) {
            return p.filter(e, p.identity)
        };
        var v = function (e, t, n, r) {
            if (t && p.every(e, p.isArray))return s.apply(r, e);
            for (var i = 0, o = e.length; o > i; i++) {
                var u = e[i];
                p.isArray(u) || p.isArguments(u) ? t ? a.apply(r, u) : v(u, t, n, r) : n || r.push(u)
            }
            return r
        };
        p.flatten = function (e, t) {
            return v(e, t, !1, [])
        }, p.without = function (e) {
            return p.difference(e, o.call(arguments, 1))
        }, p.uniq = p.unique = function (e, t, n, r) {
            if (null == e)return [];
            p.isBoolean(t) || (r = n, n = t, t = !1), null != n && (n = p.iteratee(n, r));
            for (var i = [], a = [], o = 0, s = e.length; s > o; o++) {
                var u = e[o];
                if (t)o && a === u || i.push(u), a = u; else if (n) {
                    var c = n(u, o, e);
                    p.indexOf(a, c) < 0 && (a.push(c), i.push(u))
                } else p.indexOf(i, u) < 0 && i.push(u)
            }
            return i
        }, p.union = function () {
            return p.uniq(v(arguments, !0, !0, []))
        }, p.intersection = function (e) {
            if (null == e)return [];
            for (var t = [], n = arguments.length, r = 0, i = e.length; i > r; r++) {
                var a = e[r];
                if (!p.contains(t, a)) {
                    for (var o = 1; n > o && p.contains(arguments[o], a); o++);
                    o === n && t.push(a)
                }
            }
            return t
        }, p.difference = function (e) {
            var t = v(o.call(arguments, 1), !0, !0, []);
            return p.filter(e, function (e) {
                return !p.contains(t, e)
            })
        }, p.zip = function (e) {
            if (null == e)return [];
            for (var t = p.max(arguments, "length").length, n = Array(t), r = 0; t > r; r++)n[r] = p.pluck(arguments, r);
            return n
        }, p.object = function (e, t) {
            if (null == e)return {};
            for (var n = {}, r = 0, i = e.length; i > r; r++)t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
            return n
        }, p.indexOf = function (e, t, n) {
            if (null == e)return -1;
            var r = 0, i = e.length;
            if (n) {
                if ("number" != typeof n)return r = p.sortedIndex(e, t), e[r] === t ? r : -1;
                r = 0 > n ? Math.max(0, i + n) : n
            }
            for (; i > r; r++)if (e[r] === t)return r;
            return -1
        }, p.lastIndexOf = function (e, t, n) {
            if (null == e)return -1;
            var r = e.length;
            for ("number" == typeof n && (r = 0 > n ? r + n + 1 : Math.min(r, n + 1)); --r >= 0;)if (e[r] === t)return r;
            return -1
        }, p.range = function (e, t, n) {
            arguments.length <= 1 && (t = e || 0, e = 0), n = n || 1;
            for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), a = 0; r > a; a++, e += n)i[a] = e;
            return i
        };
        var y = function () {
        };
        p.bind = function (e, t) {
            var n, r;
            if (f && e.bind === f)return f.apply(e, o.call(arguments, 1));
            if (!p.isFunction(e))throw new TypeError("Bind must be called on a function");
            return n = o.call(arguments, 2), r = function () {
                if (!(this instanceof r))return e.apply(t, n.concat(o.call(arguments)));
                y.prototype = e.prototype;
                var i = new y;
                y.prototype = null;
                var a = e.apply(i, n.concat(o.call(arguments)));
                return p.isObject(a) ? a : i
            }
        }, p.partial = function (e) {
            var t = o.call(arguments, 1);
            return function () {
                for (var n = 0, r = t.slice(), i = 0, a = r.length; a > i; i++)r[i] === p && (r[i] = arguments[n++]);
                for (; n < arguments.length;)r.push(arguments[n++]);
                return e.apply(this, r)
            }
        }, p.bindAll = function (e) {
            var t, n, r = arguments.length;
            if (1 >= r)throw new Error("bindAll must be passed function names");
            for (t = 1; r > t; t++)n = arguments[t], e[n] = p.bind(e[n], e);
            return e
        }, p.memoize = function (e, t) {
            var n = function (r) {
                var i = n.cache, a = t ? t.apply(this, arguments) : r;
                return p.has(i, a) || (i[a] = e.apply(this, arguments)), i[a]
            };
            return n.cache = {}, n
        }, p.delay = function (e, t) {
            var n = o.call(arguments, 2);
            return setTimeout(function () {
                return e.apply(null, n)
            }, t)
        }, p.defer = function (e) {
            return p.delay.apply(p, [e, 1].concat(o.call(arguments, 1)))
        }, p.throttle = function (e, t, n) {
            var r, i, a, o = null, s = 0;
            n || (n = {});
            var u = function () {
                s = n.leading === !1 ? 0 : p.now(), o = null, a = e.apply(r, i), o || (r = i = null)
            };
            return function () {
                var c = p.now();
                s || n.leading !== !1 || (s = c);
                var l = t - (c - s);
                return r = this, i = arguments, 0 >= l || l > t ? (clearTimeout(o), o = null, s = c, a = e.apply(r, i), o || (r = i = null)) : o || n.trailing === !1 || (o = setTimeout(u, l)), a
            }
        }, p.debounce = function (e, t, n) {
            var r, i, a, o, s, u = function () {
                var c = p.now() - o;
                t > c && c > 0 ? r = setTimeout(u, t - c) : (r = null, n || (s = e.apply(a, i), r || (a = i = null)))
            };
            return function () {
                a = this, i = arguments, o = p.now();
                var c = n && !r;
                return r || (r = setTimeout(u, t)), c && (s = e.apply(a, i), a = i = null), s
            }
        }, p.wrap = function (e, t) {
            return p.partial(t, e)
        }, p.negate = function (e) {
            return function () {
                return !e.apply(this, arguments)
            }
        }, p.compose = function () {
            var e = arguments, t = e.length - 1;
            return function () {
                for (var n = t, r = e[t].apply(this, arguments); n--;)r = e[n].call(this, r);
                return r
            }
        }, p.after = function (e, t) {
            return function () {
                return --e < 1 ? t.apply(this, arguments) : void 0
            }
        }, p.before = function (e, t) {
            var n;
            return function () {
                return --e > 0 ? n = t.apply(this, arguments) : t = null, n
            }
        }, p.once = p.partial(p.before, 2), p.keys = function (e) {
            if (!p.isObject(e))return [];
            if (d)return d(e);
            var t = [];
            for (var n in e)p.has(e, n) && t.push(n);
            return t
        }, p.values = function (e) {
            for (var t = p.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++)r[i] = e[t[i]];
            return r
        }, p.pairs = function (e) {
            for (var t = p.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++)r[i] = [t[i], e[t[i]]];
            return r
        }, p.invert = function (e) {
            for (var t = {}, n = p.keys(e), r = 0, i = n.length; i > r; r++)t[e[n[r]]] = n[r];
            return t
        }, p.functions = p.methods = function (e) {
            var t = [];
            for (var n in e)p.isFunction(e[n]) && t.push(n);
            return t.sort()
        }, p.extend = function (e) {
            if (!p.isObject(e))return e;
            for (var t, n, r = 1, i = arguments.length; i > r; r++) {
                t = arguments[r];
                for (n in t)c.call(t, n) && (e[n] = t[n])
            }
            return e
        }, p.pick = function (e, t, n) {
            var r, i = {};
            if (null == e)return i;
            if (p.isFunction(t)) {
                t = h(t, n);
                for (r in e) {
                    var a = e[r];
                    t(a, r, e) && (i[r] = a)
                }
            } else {
                var u = s.apply([], o.call(arguments, 1));
                e = new Object(e);
                for (var c = 0, l = u.length; l > c; c++)r = u[c], r in e && (i[r] = e[r])
            }
            return i
        }, p.omit = function (e, t, n) {
            if (p.isFunction(t))t = p.negate(t); else {
                var r = p.map(s.apply([], o.call(arguments, 1)), String);
                t = function (e, t) {
                    return !p.contains(r, t)
                }
            }
            return p.pick(e, t, n)
        }, p.defaults = function (e) {
            if (!p.isObject(e))return e;
            for (var t = 1, n = arguments.length; n > t; t++) {
                var r = arguments[t];
                for (var i in r)void 0 === e[i] && (e[i] = r[i])
            }
            return e
        }, p.clone = function (e) {
            return p.isObject(e) ? p.isArray(e) ? e.slice() : p.extend({}, e) : e
        }, p.tap = function (e, t) {
            return t(e), e
        };
        var b = function (e, t, n, r) {
            if (e === t)return 0 !== e || 1 / e === 1 / t;
            if (null == e || null == t)return e === t;
            e instanceof p && (e = e._wrapped), t instanceof p && (t = t._wrapped);
            var i = u.call(e);
            if (i !== u.call(t))return !1;
            switch (i) {
                case"[object RegExp]":
                case"[object String]":
                    return "" + e == "" + t;
                case"[object Number]":
                    return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
                case"[object Date]":
                case"[object Boolean]":
                    return +e === +t
            }
            if ("object" != typeof e || "object" != typeof t)return !1;
            for (var a = n.length; a--;)if (n[a] === e)return r[a] === t;
            var o = e.constructor, s = t.constructor;
            if (o !== s && "constructor"in e && "constructor"in t && !(p.isFunction(o) && o instanceof o && p.isFunction(s) && s instanceof s))return !1;
            n.push(e), r.push(t);
            var c, l;
            if ("[object Array]" === i) {
                if (c = e.length, l = c === t.length)for (; c-- && (l = b(e[c], t[c], n, r)););
            } else {
                var d, f = p.keys(e);
                if (c = f.length, l = p.keys(t).length === c)for (; c-- && (d = f[c], l = p.has(t, d) && b(e[d], t[d], n, r)););
            }
            return n.pop(), r.pop(), l
        };
        p.isEqual = function (e, t) {
            return b(e, t, [], [])
        }, p.isEmpty = function (e) {
            if (null == e)return !0;
            if (p.isArray(e) || p.isString(e) || p.isArguments(e))return 0 === e.length;
            for (var t in e)if (p.has(e, t))return !1;
            return !0
        }, p.isElement = function (e) {
            return !(!e || 1 !== e.nodeType)
        }, p.isArray = l || function (e) {
                return "[object Array]" === u.call(e)
            }, p.isObject = function (e) {
            var t = typeof e;
            return "function" === t || "object" === t && !!e
        }, p.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
            p["is" + e] = function (t) {
                return u.call(t) === "[object " + e + "]"
            }
        }), p.isArguments(arguments) || (p.isArguments = function (e) {
            return p.has(e, "callee")
        }), "function" != typeof/./ && (p.isFunction = function (e) {
            return "function" == typeof e || !1
        }), p.isFinite = function (e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        }, p.isNaN = function (e) {
            return p.isNumber(e) && e !== +e
        }, p.isBoolean = function (e) {
            return e === !0 || e === !1 || "[object Boolean]" === u.call(e)
        }, p.isNull = function (e) {
            return null === e
        }, p.isUndefined = function (e) {
            return void 0 === e
        }, p.has = function (e, t) {
            return null != e && c.call(e, t)
        }, p.noConflict = function () {
            return e._ = t, this
        }, p.identity = function (e) {
            return e
        }, p.constant = function (e) {
            return function () {
                return e
            }
        }, p.noop = function () {
        }, p.property = function (e) {
            return function (t) {
                return t[e]
            }
        }, p.matches = function (e) {
            var t = p.pairs(e), n = t.length;
            return function (e) {
                if (null == e)return !n;
                e = new Object(e);
                for (var r = 0; n > r; r++) {
                    var i = t[r], a = i[0];
                    if (i[1] !== e[a] || !(a in e))return !1
                }
                return !0
            }
        }, p.times = function (e, t, n) {
            var r = Array(Math.max(0, e));
            t = h(t, n, 1);
            for (var i = 0; e > i; i++)r[i] = t(i);
            return r
        }, p.random = function (e, t) {
            return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
        }, p.now = Date.now || function () {
                return (new Date).getTime()
            };
        var w = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }, x = p.invert(w), S = function (e) {
            var t = function (t) {
                return e[t]
            }, n = "(?:" + p.keys(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
            return function (e) {
                return e = null == e ? "" : "" + e, r.test(e) ? e.replace(i, t) : e
            }
        };
        p.escape = S(w), p.unescape = S(x), p.result = function (e, t) {
            if (null == e)return void 0;
            var n = e[t];
            return p.isFunction(n) ? e[t]() : n
        };
        var D = 0;
        p.uniqueId = function (e) {
            var t = ++D + "";
            return e ? e + t : t
        }, p.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var R = /(.)^/, k = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, C = /\\|'|\r|\n|\u2028|\u2029/g, M = function (e) {
            return "\\" + k[e]
        };
        p.template = function (e, t, n) {
            !t && n && (t = n), t = p.defaults({}, t, p.templateSettings);
            var r = RegExp([(t.escape || R).source, (t.interpolate || R).source, (t.evaluate || R).source].join("|") + "|$", "g"), i = 0, a = "__p+='";
            e.replace(r, function (t, n, r, o, s) {
                return a += e.slice(i, s).replace(C, M), i = s + t.length, n ? a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? a += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o && (a += "';\n" + o + "\n__p+='"), t
            }), a += "';\n", t.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
            try {
                var o = new Function(t.variable || "obj", "_", a)
            } catch (s) {
                throw s.source = a, s
            }
            var u = function (e) {
                return o.call(this, e, p)
            }, c = t.variable || "obj";
            return u.source = "function(" + c + "){\n" + a + "}", u
        }, p.chain = function (e) {
            var t = p(e);
            return t._chain = !0, t
        };
        var A = function (e) {
            return this._chain ? p(e).chain() : e
        };
        p.mixin = function (e) {
            p.each(p.functions(e), function (t) {
                var n = p[t] = e[t];
                p.prototype[t] = function () {
                    var e = [this._wrapped];
                    return a.apply(e, arguments), A.call(this, n.apply(p, e))
                }
            })
        }, p.mixin(p), p.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
            var t = n[e];
            p.prototype[e] = function () {
                var n = this._wrapped;
                return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], A.call(this, n)
            }
        }), p.each(["concat", "join", "slice"], function (e) {
            var t = n[e];
            p.prototype[e] = function () {
                return A.call(this, t.apply(this._wrapped, arguments))
            }
        }), p.prototype.value = function () {
            return this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function () {
            return p
        })
    }.call(this), define("viewmodels/home/shell", ["plugins/router", "durandal/app", "knockout", "pace", "models/constants", "typeahead", "underscore"], function (e, t, n, r, i, a, o) {
        return {
            router: e, activate: function () {
                return e.map([{
                    route: "",
                    moduleId: "viewmodels/home/home"
                }, {
                    route: "map/:longitude,:latitude,:zoom,:showHydro,:showMeteo,:areaFilter",
                    title: "Mapa",
                    moduleId: "viewmodels/home/home",
                    nav: !0
                }, {route: "station/hydro/:id", moduleId: "viewmodels/station/hydro"}, {
                    route: "station/meteo/:id",
                    moduleId: "viewmodels/station/meteo"
                }, {route: "error/:status", moduleId: "viewmodels/home/error"}, {
                    route: "contact",
                    moduleId: "viewmodels/home/contact"
                }]).buildNavigationModel(), $.getJSON("api/constants", function (e) {
                    i.instance = e
                }), r.start({document: !1, elements: !1, startOnPageLoad: !1}), e.isNavigating.subscribe(function (e) {
                    e && r.restart()
                }), $(document).ajaxError(function (t, n) {
                    console.log("error"), e.navigate("error/" + n.status)
                }), e.activate()
            }, getSearchResults: function () {
                return function (e, t) {
                    $.getJSON("api/search/", {query: e, limit: 10}, function (e) {
                        return e.forEach(function (e) {
                            e.imgEnd = "hydro" === e.c ? "hydro/normal.png" : "meteo/no-precip.png"
                        }), t(e)
                    })
                }
            }, compositionComplete: function () {
                $(".typeahead").typeahead({hint: !0, highlight: !0, minLength: 3}, {
                    name: "stations",
                    displayKey: "name",
                    source: this.getSearchResults(),
                    templates: {
                        empty: ['<div class="empty-message">', "Nie znaleziono stacji", "</div>"].join("\n"),
                        suggestion: o.template('<img width="16px" height="16px" style="margin-right:3px" alt="" src="content/images/maps/state/<%=imgEnd%>"><%=n%> <span>(<%=id%>, <%=r%>)</span>')
                    }
                }).bind("typeahead:selected", function (t, n) {
                    e.navigate("station/" + n.c + "/" + n.id)
                }), $("#contact-link").click(function (t) {
                    t.preventDefault(), e.navigate("contact")
                })
            }
        }
    }), define("viewmodels/station/chart", ["require", "knockout", "bootstrap", "flot", "flotResize", "flotTime", "numeral"], function (e, t) {
        function n(e) {
            for (var t = [], n = 0; n < e.length; n++)t.push([e[n].date, e[n].value]);
            return t
        }

        var r = function () {
            var e = this;
            e.hasAnyRecords = t.pureComputed(function () {
                return void 0 != e.series && e.series.length > 0 && void 0 != e.series[0].values && e.series[0].values.length > 0
            }), e.plot = void 0, e.title = t.observable(), e.chartId = t.observable(), e.legendId = t.observable(), e.constants = void 0, e.series = void 0, e.units = void 0, e.plotSettings = void 0, e.tooltip = null
        };
        return r.prototype.activate = function (e) {
            var t = this;
            void 0 != e && (t.title(e.title), t.chartId(e.chartId), t.legendId(e.legendId), t.series = e.series, t.constants = e.constants, t.units = e.units, t.plotSettings = e.plotSettings)
        }, r.prototype.compositionComplete = function () {
            var e = this;
            e.hasAnyRecords() && e.createPlot(), e.tooltip = $("#tooltip").tooltip({
                animation: !1,
                trigger: "manual",
                html: !0
            })
        }, r.prototype.createPlot = function () {
            var e = this, t = [], r = [];
            $.each(e.series, function (e, i) {
                var a = n(i.values), o = {label: i.name, data: a}, s = $.extend(!0, i.settings, o);
                t.push(s), null != i.name && r.push({color: i.settings.color, label: i.name})
            }), void 0 != e.constants && e.constants.length > 0 && $.each(e.constants, function (n, i) {
                var a = [[e.plotSettings.xaxis.min, i.value], [e.plotSettings.xaxis.max, i.value]], o = {
                    label: i.name,
                    data: a,
                    lines: {show: !0},
                    points: {show: !1},
                    bars: {show: !1},
                    hoverable: !1
                }, s = $.extend(!0, i.settings, o);
                t.push(s), r.push({color: i.settings.color, label: i.name})
            });
            var i = {
                grid: {
                    backgroundColor: {colors: ["#fff", "#eee"]},
                    borderWidth: 1,
                    borderColor: "#ccc",
                    hoverable: !0,
                    margin: 15
                },
                legend: {show: !1},
                xaxis: {font: {size: 12, lineHeight: 14, color: "#999"}},
                yaxis: {
                    tickFormatter: function (t) {
                        return numeral(t).format("[00]0.[00]") + " " + e.units
                    }, font: {size: 12, lineHeight: 14, color: "#999"}
                }
            }, a = $.extend(!0, e.plotSettings, i), o = "#" + e.chartId();
            e.plot = $.plot(o, t, a), $(o).bind("plothover", function (t, n, r) {
                if (r) {
                    var i;
                    if (null != e.series[0].settings.bars && null != e.series[0].settings.bars.barWidth) {
                        var a = e.plot.pointOffset({
                            x: r.datapoint[0],
                            y: r.datapoint[1]
                        }), o = e.plot.pointOffset({
                            x: r.datapoint[0] - e.series[0].settings.bars.barWidth,
                            y: r.datapoint[1]
                        });
                        i = r.pageX - (a.left - o.left) / 2
                    } else i = r.pageX;
                    e.tooltip.css({left: i + "px", top: r.pageY - 10 + "px"});
                    var s = null != r.series.value ? r.series.value : r.datapoint[1], u = null != r.series.value ? r.series.units : e.units;
                    e.tooltip.tooltip("hide").attr("data-original-title", moment.utc(r.datapoint[0]).format("YYYY-MM-DD HH:mm") + " = " + numeral(s).format("[00]0.[0]") + " " + u).tooltip("fixTitle").tooltip("show")
                } else e.tooltip.tooltip("hide")
            });
            for (var s = "", u = 0; u < r.length; u++)s += '<div class="plot-legend-item"><div class="plot-legend-item-color-border"><div class="plot-legend-item-color" style="background-color:' + r[u].color + '"></div></div><div class="plot-legend-item-label">' + r[u].label + "</div></div>";
            $("#" + e.legendId()).html(s)
        }, r
    }), define("viewmodels/station/common", ["moment", "numeral"], function (e, t) {
        var n = "[00]0.[0]", r = "YYYY-MM-DD HH:mm", i = {
            formatValueWithDate: function (i, a, o) {
                if (null == i)return "";
                var s = t(i).format(n);
                return s += null != a ? " " + a : "", s += null != o ? " (" + e.utc(o).format(r) + " UTC)" : ""
            }, formatValueWithText: function (e, r, i) {
                var a = t(e).format(n);
                return a += null != r ? " " + r : "", a += null != i ? " (" + i + ")" : ""
            }, getConstantLabel: function (e, t, n) {
                return e + " = " + t + " " + n
            }, getConnectionsData: function (e) {
                return {hydro: e.connectionsHydro, meteo: e.connectionsMeteo}
            }
        };
        return i
    }), define("viewmodels/station/connections", ["require", "knockout"], function (e, t) {
        var n = function () {
            var e = this;
            e.hydro = t.observableArray(), e.meteo = t.observableArray(), e.hasHydroConnections = t.pureComputed(function () {
                return e.hydro().length > 0
            }), e.hasMeteoConnections = t.pureComputed(function () {
                return e.meteo().length > 0
            })
        };
        return n.prototype.activate = function (e) {
            var t = this;
            void 0 != e && (t.hydro.push.apply(t.hydro, e.hydro), t.meteo.push.apply(t.meteo, e.meteo))
        }, n
    }), define("models/hydrostation", ["knockout", "moment", "models/constants", "models/common"], function (e, t, n, r) {
        function i(i, a, o, s, u, c, l, d, f, p, h, m, g, v, y, b, w, x) {
            function S(e, t, n) {
                void 0 == C.datesWithRecords[e] && (C.datesWithRecords[e] = [], C.datesWithRecords[e][0] = e), C.datesWithRecords[e][n] = t
            }

            function D(n, r, i) {
                if (void 0 != n && n.length > 0) {
                    if (void 0 != i)for (var a = 0; a < n.length; a++)i(n[a]) || n.splice(a, 1);
                    var o = e.utils.arrayMap(n, function (e) {
                        var n = t.utc(e.date), r = {date: n, value: e.value};
                        return null != e.state && (r.state = e.state), C.addDateAndRecord(n.valueOf(), r, O), r
                    });
                    r.push.apply(r, o);
                    var s = r()[0].date, u = r()[r().length - 1].date;
                    M = M ? t.min(M, s) : s, A = A ? t.max(A, u) : u, O++
                }
            }

            function R(e) {
                e.value = k(e.value, !0);
                for (var t = !1, n = 0; n < c.length; n++)if (c[n].date == e.date) {
                    t = !0;
                    break
                }
                return t
            }

            function k(e, t) {
                var n = e, r = null;
                return .05 > e ? r = "[00]0.000" : e >= .05 && 10 > e ? r = "[00]0.00" : e >= 10 && 100 > e ? r = "[00]0.0" : e >= 100 && 1e3 > e ? r = "000" : e >= 1e3 && 1e4 > e ? (r = "0000", e = 10 * numeral(.1 * e).format(r)) : e >= 1e4 && (r = "[0]0000", e = 100 * numeral(.01 * e).format(r)), null != r && (n = numeral(e).format(r)), t && "string" == typeof n ? numeral().unformat(n) : n
            }

            var C = this;
            C.addDateAndRecord = S, C.id = e.observable(i), C.name = e.observable(a), C.state = e.observable(o), C.status = e.observable(u), C.trend = e.observable(s), C.highestHighDischargeValue = e.observable(m), C.mediumHighDischargeValue = e.observable(g), C.highDischargeValue = e.observable(v), C.mediumOfYearMediumsDischargeValue = e.observable(y), C.lowDischargeValue = e.observable(b), C.mediumLowDischargeValue = e.observable(w), C.lowestLowDischargeValue = e.observable(x), C.waterStateRecords = e.observableArray(), C.waterStateObserverRecords = e.observableArray(), C.dischargeRecords = e.observableArray(), C.waterTemperatureAutoRecords = e.observableArray(), C.waterTemperatureObsRecords = e.observableArray(), C.connectionsHydro = [], C.connectionsMeteo = [], C.datesWithRecords = {}, C.trendText = e.pureComputed(function () {
                return n.instance.trendLabels[C.trend()]
            }), C.trendImgSource = e.pureComputed(function () {
                return "Content/images/maps/trend/" + C.trend() + ".png"
            });
            var M = void 0, A = void 0, O = 1;
            D(c, C.waterStateRecords), D(l, C.waterStateObserverRecords), D(d, C.dischargeRecords, R), D(f, C.waterTemperatureAutoRecords), D(p, C.waterTemperatureObsRecords), void 0 != h && (C.connectionsMeteo = r.getMeteoConnections(h), C.connectionsHydro = r.getHydroConnections(h)), void 0 !== M && void 0 !== A && (C.tableData = r.createTableData(C.datesWithRecords, M.clone(), A.clone(), O))
        }

        return i
    }), define("viewmodels/station/hydro", ["require", "knockout", "komapping", "durandal/app", "plugins/router", "moment", "bootstrap", "pace", "models/hydrostation", "models/constants", "viewmodels/station/common"], function (e, t, n, r, i, a, o, s, u, c, l) {
        function d(e) {
            return i.activeInstruction().config.title = t.computed(function () {
                return A.title()
            }), A.loadDataPromise = f(e), A.showConstants.subscribe(function () {
                A.waterStateChartData(A.getWaterStateChartData()), A.dischargeChartData(A.getDischargeChartData())
            }), A.loadDataPromise
        }

        function f(e) {
            var t = $.Deferred(), n = p(e);
            return $.when(n).then(function () {
                t.resolve()
            }, function () {
                t.reject("hydro details error")
            }), t.promise()
        }

        function p(e) {
            return $.getJSON("api/station/hydro/?id=" + e, function (e) {
                if (null == e)return void i.navigate("error/1");
                var t = n.fromJS(e.status, {}), r = new u(e.id, e.name, e.state, e.trend, t, e.waterStateRecords, e.waterStateObserverRecords, e.dischargeRecords, e.waterTemperatureAutoRecords, e.waterTemperatureObsRecords, e.connections, e.highestHighDischargeValue, e.mediumHighDischargeValue, e.highDischargeValue, e.mediumOfYearMediumsDischargeValue, e.lowDischargeValue, e.mediumLowDischargeValue, e.lowestLowDischargeValue);
                A.details(r)
            })
        }

        function h() {
            A.loadDataPromise.done(function () {
                A.waterStateChartData(A.getWaterStateChartData()), A.dischargeChartData(A.getDischargeChartData()), A.waterTemperatureChartData(A.getWaterTemperatureChartData()), A.tableData(A.getTableData()), A.connectionsData(A.getConnectionsData())
            }), $("body").tooltip({
                container: "body",
                selector: '[data-toggle="tooltip"]'
            }), $("#close").click(function () {
                i.navigateBack()
            })
        }

        function m() {
            var e = [];
            A.hasWaterStateRecords() && e.push({
                name: c.instance.waterStateTelemetrySeriesName,
                values: A.details().waterStateRecords(),
                settings: {color: c.instance.waterStateTelemetrySeriesColor}
            }), A.hasWaterStateObserverRecords() && e.push({
                name: c.instance.waterStateObserverSeriesName,
                values: A.details().waterStateObserverRecords(),
                settings: {color: c.instance.waterStateObserverSeriesColor, lines: {show: !1}}
            });
            var t = A.showConstants() ? g() : [];
            return {
                title: c.instance.waterStateChartTitle,
                legendId: "water-state-plot-legend",
                chartId: "water-state-plot",
                series: e,
                constants: t,
                units: c.instance.waterStateUnit,
                plotSettings: {
                    series: {lines: {show: !0}, points: {show: !0}},
                    xaxis: {
                        mode: "time", tickFormatter: function (e) {
                            return a.utc(e).format("HH:mm<br/>MM-DD")
                        }, min: A.startDate, max: A.endDate
                    }
                }
            }
        }

        function g() {
            var e = [], t = R([A.details().waterStateRecords(), A.details().waterStateObserverRecords()]), n = c.instance.waterStateUnit, r = A.details().status().alarmValue();
            null != r && y([t.min.state, t.max.state]) && e.push({
                name: l.getConstantLabel(c.instance.alarmValueSeriesName, r, n),
                value: r,
                settings: {color: c.instance.alarmValueSeriesColor}
            });
            var i = A.details().status().warningValue();
            null != i && b([t.min.state, t.max.state]) && e.push({
                name: l.getConstantLabel(c.instance.warningValueSeriesName, i, n),
                value: i,
                settings: {color: c.instance.warningValueSeriesColor}
            });
            var a = A.details().status().highValue();
            null != a && w([t.min.state, t.max.state]) && e.push({
                name: c.instance.highValueSeriesName,
                value: a,
                settings: {color: c.instance.highValueSeriesColor}
            });
            var o = A.details().status().lowValue();
            return null != o && x([t.min.state, t.max.state]) && e.push({
                name: c.instance.lowValueSeriesName,
                value: o,
                settings: {color: c.instance.lowValueSeriesColor}
            }), e
        }

        function v(e, t) {
            for (var n = !1, r = 0; r < t.length; r++)t[r] == e && (n = !0);
            return n
        }

        function y(e) {
            for (var t = 0; t < e.length; t++)if (v(e[t], ["alarm", "warning", "high"]))return !0;
            return !1
        }

        function b(e) {
            return y(e)
        }

        function w(e) {
            for (var t = 0; t < e.length; t++)if (v(e[t], ["high", "normal"]))return !0;
            return y(e) && x(e)
        }

        function x(e) {
            for (var t = 0; t < e.length; t++)if (v(e[t], ["normal", "low"]))return !0;
            return !1
        }

        function S() {
            var e = [{
                name: c.instance.dischargeSeriesName,
                values: A.details().dischargeRecords(),
                settings: {color: c.instance.dischargeSeriesColor, lines: {show: !0, fill: !0}, points: {show: !0}}
            }], t = A.showConstants() ? D() : [];
            return {
                title: c.instance.dischargeChartTitle,
                legendId: "water-discharge-plot-legend",
                chartId: "water-discharge-plot",
                series: e,
                constants: t,
                units: c.instance.dischargeUnit,
                plotSettings: {
                    xaxis: {
                        mode: "time", tickFormatter: function (e) {
                            return a.utc(e).format("HH:mm<br/>MM-DD")
                        }, min: A.startDate, max: A.endDate
                    }, yaxis: {min: 0}
                }
            }
        }

        function D() {
            function e(e) {
                e >= n || e >= i || e >= o ? (r = !0, a = !0, s = !0) : e >= u && o >= e ? (s = !0, l = !0) : e >= d && u >= e ? (l = !0, f = !0) : e >= p && d >= e ? (f = !0, h = !0) : e >= m && d >= e ? (h = !0, g = !0) : m > e && (g = !0)
            }

            var t = [], n = (c.instance.dischargeUnit, A.details().highestHighDischargeValue()), r = !1, i = A.details().mediumHighDischargeValue(), a = !1, o = A.details().highDischargeValue(), s = !1, u = A.details().mediumOfYearMediumsDischargeValue(), l = !1, d = A.details().lowDischargeValue(), f = !1, p = A.details().mediumLowDischargeValue(), h = !1, m = A.details().lowestLowDischargeValue(), g = !1, v = R([A.details().dischargeRecords()]);
            return e(v.min.value), e(v.max.value), null != n && r && t.push({
                name: c.instance.highestHighDischargeSeriesName,
                value: n,
                settings: {color: c.instance.highestHighDischargeSeriesColor}
            }), null != i && a && t.push({
                name: c.instance.mediumHighDischargeSeriesName,
                value: i,
                settings: {color: c.instance.mediumHighDischargeSeriesColor}
            }), null != o && s && t.push({
                name: c.instance.highDischargeSeriesName,
                value: o,
                settings: {color: c.instance.highDischargeSeriesColor}
            }), null != u && l && t.push({
                name: c.instance.mediumOfYearMediumsDischargeSeriesName,
                value: u,
                settings: {color: c.instance.mediumOfYearMediumsDischargeSeriesColor}
            }), null != d && f && t.push({
                name: c.instance.lowDischargeSeriesName,
                value: d,
                settings: {color: c.instance.lowDischargeSeriesColor}
            }), null != p && h && t.push({
                name: c.instance.mediumLowDischargeSeriesName,
                value: p,
                settings: {color: c.instance.mediumLowDischargeSeriesColor}
            }), null != m && g && t.push({
                name: c.instance.lowestLowDischargeSeriesName,
                value: m,
                settings: {color: c.instance.lowestLowDischargeSeriesColor}
            }), t
        }

        function R(e) {
            for (var t = {min: null, max: null}, n = 0; n < e.length; n++)for (var r = 0; r < e[n].length; r++) {
                var i = e[n][r];
                (null == t.min || i.value < t.min.value) && (t.min = i), (null == t.max || i.value > t.max.value) && (t.max = i)
            }
            return t
        }

        function k() {
            var e = {};
            e[c.instance.waterTemperatureAutoSeriesName] = c.instance.waterTemperatureAutoSeriesColor;
            var t = [];
            return A.hasWaterTemperatureObsRecords() && t.push({
                name: c.instance.waterTemperatureObsSeriesName,
                values: A.details().waterTemperatureObsRecords(),
                settings: {color: c.instance.waterTemperatureObsSeriesColor}
            }), A.hasWaterTemperatureAutoRecords() && t.push({
                name: c.instance.waterTemperatureAutoSeriesName,
                values: A.details().waterTemperatureAutoRecords(),
                settings: {color: c.instance.waterTemperatureAutoSeriesColor}
            }), {
                title: c.instance.waterTemperatureChartTitle,
                legendId: "water-temperature-plot-legend",
                chartId: "water-temperature-plot",
                series: t,
                units: c.instance.temperatureUnit,
                plotSettings: {
                    series: {lines: {show: !0}, points: {show: !0}},
                    xaxis: {
                        mode: "time", tickFormatter: function (e) {
                            return a.utc(e).format("HH:mm<br/>MM-DD")
                        }, min: A.startDate, max: A.endDate
                    }
                }
            }
        }

        function C() {
            var e = {headers: [c.instance.timeHeader], rows: A.details().tableData};
            return A.hasWaterStateRecords() && e.headers.push(c.instance.waterStateTelemetrySeriesName + " [" + c.instance.waterStateUnit + "]"), A.hasWaterStateObserverRecords() && e.headers.push(c.instance.waterStateObserverSeriesName + " [" + c.instance.waterStateUnit + "]"), A.hasDischargeRecords() && e.headers.push(c.instance.dischargeSeriesName + " [" + c.instance.dischargeUnit + "]"), A.hasWaterTemperatureAutoRecords() && e.headers.push(c.instance.waterTemperatureAutoSeriesName + " [" + c.instance.temperatureUnit + "]"), A.hasWaterTemperatureObsRecords() && e.headers.push(c.instance.waterTemperatureObsSeriesName + " [" + c.instance.temperatureUnit + "]"), e
        }

        function M() {
            return l.getConnectionsData(A.details())
        }

        var A = {
            activate: d,
            compositionComplete: h,
            getWaterStateChartData: m,
            getDischargeChartData: S,
            getWaterTemperatureChartData: k,
            getTableData: C,
            getConnectionsData: M,
            formatValueWithDate: l.formatValueWithDate,
            loadDataPromise: null,
            startDate: a.utc().add(-3, "days"),
            endDate: a.utc(),
            hasWaterStateRecords: t.pureComputed({
                read: function () {
                    return A.details().waterStateRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasWaterStateObserverRecords: t.pureComputed({
                read: function () {
                    return A.details().waterStateObserverRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasWaterTemperatureAutoRecords: t.pureComputed({
                read: function () {
                    return A.details().waterTemperatureAutoRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasWaterTemperatureObsRecords: t.pureComputed({
                read: function () {
                    return A.details().waterTemperatureObsRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasDischargeRecords: t.pureComputed({
                read: function () {
                    return A.details().dischargeRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasAnyRecords: t.pureComputed({
                read: function () {
                    return A.hasWaterStateObserverRecords() || A.hasWaterStateRecords() || A.hasWaterTemperatureAutoRecords() || A.hasWaterTemperatureObsRecords() || A.hasDischargeRecords()
                }, deferEvaluation: !0
            }),
            waterStateChartData: t.observable(),
            dischargeChartData: t.observable(),
            waterTemperatureChartData: t.observable(),
            tableData: t.observable(),
            details: t.observable(new u),
            connectionsData: t.observable(),
            showConstants: t.observable(!1),
            title: t.pureComputed({
                read: function () {
                    var e = A.details();
                    return e.name() + " (" + e.id() + ")"
                }, deferEvaluation: !0
            }),
            titleWithState: t.pureComputed({
                read: function () {
                    var e = A.details();
                    return e.name() + " (" + e.id() + ") - " + c.instance.hydroStatusLabels[e.state()]
                }, deferEvaluation: !0
            }),
            state: t.pureComputed({
                read: function () {
                    return c.instance.hydroStatusLabels[A.details().state()]
                }, deferEvaluation: !0
            }),
            imageSource: t.pureComputed({
                read: function () {
                    return "Content/images/maps/state/hydro/" + A.details().state() + ".png"
                }, deferEvaluation: !0
            })
        };
        return A
    }), define("models/meteostation", ["knockout", "moment", "models/common"], function (e, t, n) {
        function r(r, i, a, o, s, u, c, l, d, f, p, h, m, g, v) {
            function y(e, t, n) {
                void 0 == w.datesWithRecords[e] && (w.datesWithRecords[e] = [], w.datesWithRecords[e][0] = e), w.datesWithRecords[e][n] = t
            }

            function b(n, r) {
                if (void 0 != n && n.length > 0) {
                    var i = e.utils.arrayMap(n, function (e) {
                        var n = t.utc(e.date), r = {date: n, value: e.value};
                        return w.addDateAndRecord(n.valueOf(), r, D), r
                    });
                    r.push.apply(r, i);
                    var a = r()[0].date, o = r()[r().length - 1].date;
                    x = x ? t.min(x, a) : a, S = S ? t.max(S, o) : o, D++
                }
            }

            var w = this;
            w.addDateAndRecord = y, w.id = e.observable(r), w.name = e.observable(i), w.state = e.observable(a), w.status = e.observable(o), w.tenMinutesPrecipRecords = e.observableArray(), w.hourlyPrecipRecords = e.observableArray(), w.dailyPrecipRecords = e.observableArray(), w.temperatureAutoRecords = e.observableArray(), w.temperatureObsRecords = e.observableArray(), w.windDirectionTelRecords = e.observableArray(), w.windDirectionObsRecords = e.observableArray(), w.windVelocityTelRecords = e.observableArray(), w.windVelocityObsRecords = e.observableArray(), w.windMaxVelocityRecords = e.observableArray(), w.connectionsHydro = [], w.connectionsMeteo = [], w.datesWithRecords = {};
            var x = void 0, S = void 0, D = 1;
            b(s, w.tenMinutesPrecipRecords), b(u, w.hourlyPrecipRecords), b(c, w.dailyPrecipRecords), b(l, w.temperatureAutoRecords), b(d, w.temperatureObsRecords), b(g, w.windMaxVelocityRecords), b(h, w.windVelocityTelRecords), b(m, w.windVelocityObsRecords), b(f, w.windDirectionTelRecords), b(p, w.windDirectionObsRecords), void 0 != v && (w.connectionsMeteo = n.getMeteoConnections(v), w.connectionsHydro = n.getHydroConnections(v)), void 0 !== x && void 0 !== S && (w.tableData = n.createTableData(w.datesWithRecords, x.clone(), S.clone(), D))
        }

        return r
    }), define("flotArrows", ["jquery", "flot"], function (e) {
        !function (e) {
            function t(e, t) {
                var n = {
                    arrowN: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 0)
                    }, arrowNNE: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 22.5)
                    }, arrowNE: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 45)
                    }, arrowENE: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 67.5)
                    }, arrowE: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 90)
                    }, arrowESE: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 112.5)
                    }, arrowSE: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 135)
                    }, arrowSSE: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 157, 5)
                    }, arrowS: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 180)
                    }, arrowSSW: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 202.5)
                    }, arrowSW: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 225)
                    }, arrowWSW: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 247.5)
                    }, arrowW: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 270)
                    }, arrowWNW: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 292.5)
                    }, arrowNW: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 315)
                    }, arrowNNW: function (e, t, n, r) {
                        var i = r * Math.sqrt(Math.PI) / 2, o = {x: t, y: n};
                        a(e, o, i, 337.5)
                    }
                }, r = t.points.symbol;
                n[r] && (t.points.symbol = n[r])
            }

            function n(e) {
                e.hooks.processDatapoints.push(t)
            }

            function r(e, t, n) {
                0 == n && (n = 360);
                var r = Math.sin(n * Math.PI / 180), i = Math.cos(n * Math.PI / 180), a = (t.x - e.x) * i + e.x - (t.y - e.y) * r, o = (t.x - e.x) * r + (t.y - e.y) * i + e.y;
                return {x: a, y: o}
            }

            function i(e, t, n) {
                var i = {x: e.x, y: e.y}, a = {x: e.x, y: e.y - t}, o = {
                    x: e.x + .5 * t,
                    y: e.y + .5 * t
                }, s = {x: e.x - .5 * t, y: e.y + .5 * t};
                return [r(e, i, n), r(e, a, n), r(e, o, n), r(e, s, n)]
            }

            function a(e, t, n, r) {
                var a = i(t, n, r);
                e.moveTo(a[0].x, a[0].y), e.lineTo(a[1].x, a[1].y), e.moveTo(a[2].x, a[2].y), e.lineTo(a[1].x, a[1].y), e.lineTo(a[3].x, a[3].y)
            }

            e.plot.plugins.push({init: n, name: "symbols", version: "1.0"})
        }(e)
    }), define("viewmodels/station/meteo", ["require", "knockout", "durandal/app", "plugins/router", "moment", "bootstrap", "pace", "models/meteostation", "models/constants", "komapping", "viewmodels/station/common", "flotArrows"], function (e, t, n, r, i, a, o, s, u, c, l) {
        function d(e) {
            return r.activeInstruction().config.title = t.computed(function () {
                return D.title()
            }), D.loadDataPromise = f(e), D.showConstants.subscribe(function () {
                D.hourlyPrecipChartData(D.getHourlyPrecipChartData()), D.dailyPrecipChartData(D.getDailyPrecipChartData())
            }), D.loadDataPromise
        }

        function f(e) {
            var t = $.Deferred(), n = p(e);
            return $.when(n).then(function () {
                t.resolve()
            }, function () {
                t.reject("meteo details error")
            }), t.promise()
        }

        function p(e) {
            return $.getJSON("api/station/meteo/?id=" + e, function (e) {
                if (null == e)return void r.navigate("error/1");
                var n = t.mapping.fromJS(e.status, {}), i = new s(e.id, e.name, e.state, n, e.tenMinutesPrecipRecords, e.hourlyPrecipRecords, e.dailyPrecipRecords, e.temperatureAutoRecords, e.temperatureObsRecords, e.windDirectionTelRecords, e.windDirectionObsRecords, e.windVelocityTelRecords, e.windVelocityObsRecords, e.windMaxVelocityRecords, e.connections);
                D.details(i)
            })
        }

        function h() {
            D.loadDataPromise.done(function () {
                D.tenMinutesPrecipChartData(D.getTenMinutesPrecipChartData()), D.hourlyPrecipChartData(D.getHourlyPrecipChartData()), D.dailyPrecipChartData(D.getDailyPrecipChartData()), D.temperatureChartData(D.getTemperatureChartData()), D.windChartData(D.getWindChartData()), D.tableData(D.getTableData()), D.connectionsData(D.getConnectionsData())
            }), $("#close").click(function () {
                r.navigateBack()
            })
        }

        function m() {
            var e = [{
                name: u.instance.tenMinutesPrecipSeriesName,
                values: D.details().tenMinutesPrecipRecords(),
                settings: {
                    bars: {barWidth: 6e5, fillColor: {colors: [{opacity: .8}, {opacity: .3}]}},
                    color: u.instance.tenMinutesPrecipSeriesColor
                }
            }], t = D.now.clone(), n = D.now.clone().add(-70, "minutes");
            return {
                title: u.instance.tenMinutesPrecipChartTitle,
                legendId: "ten-minutes-precip-plot-legend",
                chartId: "ten-minutes-precip-plot",
                series: e,
                units: u.instance.precipUnit,
                plotSettings: {
                    series: {bars: {show: !0, fill: !0, align: "right"}},
                    xaxis: {
                        mode: "time", tickFormatter: function (e) {
                            return i.utc(e).format("HH:mm")
                        }, minTickSize: [10, "minute"], min: n, max: t
                    },
                    yaxis: {tickDecimals: 0, min: 0}
                }
            }
        }

        function g() {
            var e = [{
                name: u.instance.hourlyPrecipSeriesName,
                values: D.details().hourlyPrecipRecords(),
                settings: {
                    bars: {barWidth: 36e5, fillColor: {colors: [{opacity: .8}, {opacity: .3}]}},
                    color: u.instance.hourlyPrecipSeriesColor
                }
            }], t = [], n = D.details().status().maxHourPrecipValue();
            D.showConstants() && null != n && t.push({
                name: l.getConstantLabel(u.instance.maxHourlyPrecipValueSeriesName, n, u.instance.precipUnit),
                value: n,
                settings: {color: u.instance.maxHourlyPrecipValueSeriesColor}
            });
            var r = D.now.clone().add(1, "hours"), a = D.now.clone().add(-48, "hours");
            return {
                title: u.instance.hourlyPrecipChartTitle,
                legendId: "hourly-precip-plot-legend",
                chartId: "hourly-precip-plot",
                series: e,
                constants: t,
                units: u.instance.precipUnit,
                plotSettings: {
                    series: {bars: {show: !0, fill: !0, align: "right"}},
                    xaxis: {
                        mode: "time", tickFormatter: function (e) {
                            return i.utc(e).format("HH:mm<br/>MM-DD")
                        }, minTickSize: [1, "hour"], min: a, max: r
                    },
                    yaxis: {min: 0}
                }
            }
        }

        function v() {
            var e = [{
                name: u.instance.dailyPrecipSeriesName,
                values: D.details().dailyPrecipRecords(),
                settings: {
                    bars: {barWidth: 864e5, fillColor: {colors: [{opacity: .8}, {opacity: .3}]}},
                    color: u.instance.dailyPrecipSeriesColor
                }
            }], t = [], n = D.details().status().maxDailyPrecipValue();
            D.showConstants() && null != n && t.push({
                name: l.getConstantLabel(u.instance.maxDailyPrecipValueSeriesName, n, u.instance.precipUnit),
                value: n,
                settings: {color: u.instance.maxDailyPrecipValueSeriesColor}
            });
            var r = D.now.clone(), a = D.now.clone().add(-169, "hours");
            return {
                title: u.instance.dailyPrecipChartTitle,
                legendId: "daily-precip-plot-legend",
                chartId: "daily-precip-plot",
                series: e,
                constants: t,
                units: u.instance.precipUnit,
                plotSettings: {
                    series: {bars: {show: !0, fill: !0, align: "right"}},
                    xaxis: {
                        mode: "time", tickFormatter: function (e) {
                            return i.utc(e).format("MM-DD")
                        }, minTickSize: [1, "day"], min: a, max: r
                    },
                    yaxis: {min: 0}
                }
            }
        }

        function y() {
            var e = [];
            D.details().temperatureAutoRecords().length > 0 && e.push({
                name: u.instance.temperatureAutoSeriesName,
                values: D.details().temperatureAutoRecords(),
                settings: {color: u.instance.temperatureAutoSeriesColor}
            }), D.details().temperatureObsRecords().length > 0 && e.push({
                name: u.instance.temperatureObsSeriesName,
                values: D.details().temperatureObsRecords(),
                settings: {color: u.instance.temperatureObsSeriesColor}
            });
            var t = D.now.clone().add(1, "hours"), n = D.now.clone().add(-48, "hours");
            return {
                title: u.instance.temperatureChartTitle,
                legendId: "temperature-plot-legend",
                chartId: "temperature-plot",
                series: e,
                units: u.instance.temperatureUnit,
                plotSettings: {
                    series: {lines: {show: !0}, points: {show: !0}},
                    xaxis: {
                        mode: "time", tickFormatter: function (e) {
                            return i.utc(e).format("MM-DD<br/>HH:mm")
                        }, minTickSize: [1, "hour"], min: n, max: t
                    }
                }
            }
        }

        function b() {
            var e = [], t = 0, n = D.details().windMaxVelocityRecords();
            if (n.length > 0) {
                e.push({
                    name: u.instance.windMaxVelocitySeriesName,
                    values: n,
                    settings: {color: u.instance.windMaxVelocitySeriesColor}
                });
                for (var r = 0; r < n.length; r++)n[r].value > t && (t = n[r].value)
            }
            var a = D.details().windVelocityTelRecords();
            if (a.length > 0) {
                e.push({
                    name: u.instance.windVelocityTelSeriesName,
                    values: a,
                    settings: {color: u.instance.windVelocityTelSeriesColor}
                });
                for (var r = 0; r < a.length; r++)a[r].value > t && (t = a[r].value)
            }
            var o = D.details().windVelocityObsRecords();
            if (o.length > 0) {
                e.push({
                    name: u.instance.windVelocityObsSeriesName,
                    values: o,
                    settings: {color: u.instance.windVelocityObsSeriesColor}
                });
                for (var r = 0; r < o.length; r++)o[r].value > t && (t = o[r].value)
            }
            0 === t && (t = 1);
            var s = D.details().windDirectionTelRecords();
            if (s.length > 0) {
                for (var c = u.instance.windDirectionTelSeriesColor, r = 0; r < s.length; r++) {
                    var l = s[r].value;
                    e.push({
                        name: null,
                        values: [{date: s[r].date, value: 1.1 * t}],
                        settings: {
                            color: c,
                            points: {show: !0, symbol: w(l), radius: 5, fill: !0, fillColor: c, lineWidth: 1},
                            value: l,
                            units: u.instance.windDirectionUnit
                        }
                    })
                }
                e.push({name: u.instance.windDirectionTelSeriesName, values: [], settings: {color: c}})
            }
            var d = D.details().windDirectionObsRecords();
            if (d.length > 0) {
                for (var f = u.instance.windDirectionObsSeriesColor, r = 0; r < d.length; r++) {
                    var l = d[r].value;
                    e.push({
                        name: null,
                        values: [{date: d[r].date, value: 1.2 * t}],
                        settings: {
                            color: f,
                            points: {show: !0, symbol: w(l), radius: 5, fill: !0, fillColor: f, lineWidth: 1},
                            value: l,
                            units: u.instance.windDirectionUnit
                        }
                    })
                }
                e.push({name: u.instance.windDirectionObsSeriesName, values: [], settings: {color: f}})
            }
            var p = D.now.clone().add(1, "hours"), h = D.now.clone().add(-48, "hours");
            return {
                title: u.instance.windChartTitle,
                legendId: "wind-plot-legend",
                chartId: "wind-plot",
                series: e,
                units: u.instance.windVelocityUnit,
                plotSettings: {
                    series: {lines: {show: !0}, points: {show: !0}},
                    xaxis: {
                        mode: "time", tickFormatter: function (e) {
                            return i.utc(e).format("MM-DD<br/>HH:mm")
                        }, minTickSize: [1, "hour"], min: h, max: p
                    }
                }
            }
        }

        function w(e) {
            return e >= 349 || 11 >= e ? "arrowS" : e >= 12 && 33 >= e ? "arrowSSW" : e >= 34 && 56 >= e ? "arrowSW" : e >= 57 && 78 >= e ? "arrowWSW" : e >= 79 && 101 >= e ? "arrowW" : e >= 102 && 123 >= e ? "arrowWNW" : e >= 124 && 146 >= e ? "arrowNW" : e >= 147 && 168 >= e ? "arrowNNW" : e >= 169 && 191 >= e ? "arrowN" : e >= 192 && 213 >= e ? "arrowNNE" : e >= 214 && 236 >= e ? "arrowNE" : e >= 237 && 258 >= e ? "arrowENE" : e >= 259 && 281 >= e ? "arrowE" : e >= 282 && 303 >= e ? "arrowESE" : e >= 304 && 326 >= e ? "arrowSE" : e >= 327 && 348 >= e ? "arrowSSE" : "circle"
        }

        function x() {
            var e = {headers: [u.instance.timeHeader], rows: D.details().tableData};
            return D.hasTenMinutesPrecipRecords() && e.headers.push(u.instance.tenMinutesPrecipSeriesName + " [" + u.instance.precipUnit + "]"), D.hasHourlyPrecipRecords() && e.headers.push(u.instance.hourlyPrecipSeriesName + " [" + u.instance.precipUnit + "]"), D.hasDailyPrecipRecords() && e.headers.push(u.instance.dailyPrecipSeriesName + " [" + u.instance.precipUnit + "]"), D.hasTemperatureAutoPrecipRecords() && e.headers.push(u.instance.temperatureAutoSeriesName + " [" + u.instance.temperatureUnit + "]"), D.hasTemperatureObsPrecipRecords() && e.headers.push(u.instance.temperatureObsSeriesName + " [" + u.instance.temperatureUnit + "]"), D.hasWindMaxVelocityRecords() && e.headers.push(u.instance.windMaxVelocitySeriesName + " [" + u.instance.windVelocityUnit + "]"), D.hasWindVelocityTelRecords() && e.headers.push(u.instance.windVelocityTelSeriesName + " [" + u.instance.windVelocityUnit + "]"), D.hasWindVelocityObsRecords() && e.headers.push(u.instance.windVelocityObsSeriesName + " [" + u.instance.windVelocityUnit + "]"), D.hasWindDirectionTelRecords() && e.headers.push(u.instance.windDirectionTelSeriesName + " [" + u.instance.windDirectionUnit + "]"), D.hasWindDirectionObsRecords() && e.headers.push(u.instance.windDirectionObsSeriesName + " [" + u.instance.windDirectionUnit + "]"), e
        }

        function S() {
            return l.getConnectionsData(D.details())
        }

        t.mapping = c;
        var D = {
            activate: d,
            compositionComplete: h,
            loadDataPromise: null,
            details: t.observable(new s),
            now: i.utc(),
            getTenMinutesPrecipChartData: m,
            getHourlyPrecipChartData: g,
            getDailyPrecipChartData: v,
            getTemperatureChartData: y,
            getWindChartData: b,
            getConnectionsData: S,
            tenMinutesPrecipChartData: t.observable(),
            hourlyPrecipChartData: t.observable(),
            dailyPrecipChartData: t.observable(),
            temperatureChartData: t.observable(),
            windChartData: t.observable(),
            getTableData: x,
            connectionsData: t.observable(),
            tableData: t.observable(),
            formatValueWithDate: l.formatValueWithDate,
            formatValueWithText: l.formatValueWithText,
            showConstants: t.observable(!1),
            hasTenMinutesPrecipRecords: t.pureComputed({
                read: function () {
                    return D.details().tenMinutesPrecipRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasHourlyPrecipRecords: t.pureComputed({
                read: function () {
                    return D.details().hourlyPrecipRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasDailyPrecipRecords: t.pureComputed({
                read: function () {
                    return D.details().dailyPrecipRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasTemperatureAutoPrecipRecords: t.pureComputed({
                read: function () {
                    return D.details().temperatureAutoRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasTemperatureObsPrecipRecords: t.pureComputed({
                read: function () {
                    return D.details().temperatureObsRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasWindVelocityTelRecords: t.pureComputed({
                read: function () {
                    return D.details().windVelocityTelRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasWindVelocityObsRecords: t.pureComputed({
                read: function () {
                    return D.details().windVelocityObsRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasWindDirectionTelRecords: t.pureComputed({
                read: function () {
                    return D.details().windDirectionTelRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasWindDirectionObsRecords: t.pureComputed({
                read: function () {
                    return D.details().windDirectionObsRecords().length > 0
                }, deferEvaluation: !0
            }),
            hasWindMaxVelocityRecords: t.pureComputed({
                read: function () {
                    return D.details().windMaxVelocityRecords().length > 0
                }, deferEvaluation: !0
            }),
            title: t.pureComputed({
                read: function () {
                    var e = D.details();
                    return e.name() + " (" + e.id() + ")"
                }, deferEvaluation: !0
            }),
            titleWithState: t.computed({
                read: function () {
                    var e = D.details();
                    return e.name() + " (" + e.id() + ") - " + u.instance.meteoStatusLabels[e.state()]
                }, deferEvaluation: !0
            }),
            state: t.pureComputed({
                read: function () {
                    return u.instance.meteoStatusLabels[D.details().state()]
                }, deferEvaluation: !0
            }),
            imageSource: t.computed({
                read: function () {
                    return "Content/images/maps/state/meteo/" + D.details().state() + ".png"
                }, deferEvaluation: !0
            }),
            isNotNullObservable: function (e) {
                return null != e && "function" != typeof e
            }
        };
        return D
    }), define("viewmodels/station/table", ["require", "knockout", "numeral", "moment"], function (e, t, n) {
        var r = function () {
            function e(e) {
                return "object" == typeof e
            }

            var r = this;
            r.title = t.observable(), r.cssAttributes = t.observable(), r.rows = t.observable(), r.headers = t.observable(), r.hasAnyRecords = t.pureComputed(function () {
                return void 0 != r.rows() && r.rows().length > 0
            }), r.getFormattedContent = function (t) {
                return e(t) ? n(t.value).format("[00]0.[0]") : t
            }, r.getClass = function (t) {
                var n = e(t) && null != t.state ? t.state : "default", r = e(t) ? "right" : "left";
                return n + "-state-cell text-" + r
            }
        };
        return r.prototype.activate = function (e) {
            var t = this;
            void 0 != e && (t.title(e.title), t.cssAttributes(e.cssAttributes), t.headers(e.headers), t.rows(e.rows))
        }, r
    }), define("plugins/dialog", ["durandal/system", "durandal/app", "durandal/composition", "durandal/activator", "durandal/viewEngine", "jquery", "knockout"], function (e, t, n, r, i, a, o) {
        function s(t) {
            return e.defer(function (n) {
                e.isString(t) ? e.acquire(t).then(function (t) {
                    n.resolve(e.resolveObject(t))
                }).fail(function (n) {
                    e.error("Failed to load dialog module (" + t + "). Details: " + n.message)
                }) : n.resolve(t)
            }).promise()
        }

        var u, c = {}, l = o.observable(0), d = function (e, t, n, r, i) {
            this.message = e, this.title = t || d.defaultTitle, this.options = n || d.defaultOptions, this.autoclose = r || !1, this.settings = a.extend({}, d.defaultSettings, i)
        };
        return d.prototype.selectOption = function (e) {
            u.close(this, e)
        }, d.prototype.getView = function () {
            return i.processMarkup(d.defaultViewMarkup)
        }, d.setViewUrl = function (e) {
            delete d.prototype.getView, d.prototype.viewUrl = e
        }, d.defaultTitle = t.title || "Application", d.defaultOptions = ["Ok"], d.defaultSettings = {
            buttonClass: "btn btn-default",
            primaryButtonClass: "btn-primary autofocus",
            secondaryButtonClass: "",
            "class": "modal-content messageBox",
            style: null
        }, d.setDefaults = function (e) {
            a.extend(d.defaultSettings, e)
        }, d.prototype.getButtonClass = function (e) {
            var t = "";
            return this.settings && (this.settings.buttonClass && (t = this.settings.buttonClass), 0 === e() && this.settings.primaryButtonClass && (t.length > 0 && (t += " "), t += this.settings.primaryButtonClass), e() > 0 && this.settings.secondaryButtonClass && (t.length > 0 && (t += " "), t += this.settings.secondaryButtonClass)), t
        }, d.prototype.getClass = function () {
            return this.settings ? this.settings["class"] : "messageBox"
        }, d.prototype.getStyle = function () {
            return this.settings ? this.settings.style : null
        }, d.prototype.getButtonText = function (t) {
            var n = a.type(t);
            return "string" === n ? t : "object" === n ? "string" === a.type(t.text) ? t.text : (e.error("The object for a MessageBox button does not have a text property that is a string."), null) : (e.error("Object for a MessageBox button is not a string or object but " + n + "."), null)
        }, d.prototype.getButtonValue = function (t) {
            var n = a.type(t);
            return "string" === n ? t : "object" === n ? "undefined" === a.type(t.text) ? (e.error("The object for a MessageBox button does not have a value property defined."), null) : t.value : (e.error("Object for a MessageBox button is not a string or object but " + n + "."), null)
        }, d.defaultViewMarkup = ['<div data-view="plugins/messageBox" data-bind="css: getClass(), style: getStyle()">', '<div class="modal-header">', '<h3 data-bind="html: title"></h3>', "</div>", '<div class="modal-body">', '<p class="message" data-bind="html: message"></p>', "</div>", '<div class="modal-footer">', "<!-- ko foreach: options -->", '<button data-bind="click: function () { $parent.selectOption($parent.getButtonValue($data)); }, text: $parent.getButtonText($data), css: $parent.getButtonClass($index)"></button>', "<!-- /ko -->", '<div style="clear:both;"></div>', "</div>", "</div>"].join("\n"), u = {
            MessageBox: d,
            currentZIndex: 1050,
            getNextZIndex: function () {
                return ++this.currentZIndex
            },
            isOpen: o.computed(function () {
                return l() > 0
            }),
            getContext: function (e) {
                return c[e || "default"]
            },
            addContext: function (e, t) {
                t.name = e, c[e] = t;
                var n = "show" + e.substr(0, 1).toUpperCase() + e.substr(1);
                this[n] = function (t, n) {
                    return this.show(t, n, e)
                }
            },
            createCompositionSettings: function (e, t) {
                var n = {model: e, activate: !1, transition: !1};
                return t.binding && (n.binding = t.binding), t.attached && (n.attached = t.attached), t.compositionComplete && (n.compositionComplete = t.compositionComplete), n
            },
            getDialog: function (e) {
                return e ? e.__dialog__ : void 0
            },
            close: function (e) {
                var t = this.getDialog(e);
                if (t) {
                    var n = Array.prototype.slice.call(arguments, 1);
                    t.close.apply(t, n)
                }
            },
            show: function (t, i, a) {
                var o = this, u = c[a || "default"];
                return e.defer(function (e) {
                    s(t).then(function (t) {
                        var a = r.create();
                        a.activateItem(t, i).then(function (r) {
                            if (r) {
                                var i = t.__dialog__ = {
                                    owner: t, context: u, activator: a, close: function () {
                                        var n = arguments;
                                        a.deactivateItem(t, !0).then(function (r) {
                                            r && (l(l() - 1), u.removeHost(i), delete t.__dialog__, 0 === n.length ? e.resolve() : 1 === n.length ? e.resolve(n[0]) : e.resolve.apply(e, n))
                                        })
                                    }
                                };
                                i.settings = o.createCompositionSettings(t, u), u.addHost(i), l(l() + 1), n.compose(i.host, i.settings)
                            } else e.resolve(!1)
                        })
                    })
                }).promise()
            },
            showMessage: function (t, n, r, i, a) {
                return e.isString(this.MessageBox) ? u.show(this.MessageBox, [t, n || d.defaultTitle, r || d.defaultOptions, i || !1, a || {}]) : u.show(new this.MessageBox(t, n, r, i, a))
            },
            install: function (e) {
                t.showDialog = function (e, t, n) {
                    return u.show(e, t, n)
                }, t.closeDialog = function () {
                    return u.close.apply(u, arguments)
                }, t.showMessage = function (e, t, n, r, i) {
                    return u.showMessage(e, t, n, r, i)
                }, e.messageBox && (u.MessageBox = e.messageBox), e.messageBoxView && (u.MessageBox.prototype.getView = function () {
                    return i.processMarkup(e.messageBoxView)
                }), e.messageBoxViewUrl && u.MessageBox.setViewUrl(e.messageBoxViewUrl)
            }
        }, u.addContext("default", {
            blockoutOpacity: .2, removeDelay: 200, addHost: function (e) {
                var t = a("body"), n = a('<div class="modalBlockout"></div>').css({
                    "z-index": u.getNextZIndex(),
                    opacity: this.blockoutOpacity
                }).appendTo(t), r = a('<div class="modalHost"></div>').css({"z-index": u.getNextZIndex()}).appendTo(t);
                if (e.host = r.get(0), e.blockout = n.get(0), !u.isOpen()) {
                    e.oldBodyMarginRight = t.css("margin-right"), e.oldInlineMarginRight = t.get(0).style.marginRight;
                    var i = a("html"), o = t.outerWidth(!0), s = i.scrollTop();
                    a("html").css("overflow-y", "hidden");
                    var c = a("body").outerWidth(!0);
                    t.css("margin-right", c - o + parseInt(e.oldBodyMarginRight, 10) + "px"), i.scrollTop(s)
                }
            }, removeHost: function (e) {
                if (a(e.host).css("opacity", 0), a(e.blockout).css("opacity", 0), setTimeout(function () {
                        o.removeNode(e.host), o.removeNode(e.blockout)
                    }, this.removeDelay), !u.isOpen()) {
                    var t = a("html"), n = t.scrollTop();
                    t.css("overflow-y", "").scrollTop(n), e.oldInlineMarginRight ? a("body").css("margin-right", e.oldBodyMarginRight) : a("body").css("margin-right", "")
                }
            }, attached: function (e) {
                a(e).css("visibility", "hidden")
            }, compositionComplete: function (e, t, n) {
                var r = u.getDialog(n.model), i = a(e), o = i.find("img").filter(function () {
                    var e = a(this);
                    return !(this.style.width && this.style.height || e.attr("width") && e.attr("height"))
                });
                i.data("predefinedWidth", i.get(0).style.width);
                var s = function (e, t) {
                    setTimeout(function () {
                        var n = a(e);
                        t.context.reposition(e), a(t.host).css("opacity", 1), n.css("visibility", "visible"), n.find(".autofocus").first().focus()
                    }, 1)
                };
                s(e, r), o.load(function () {
                    s(e, r)
                }), (i.hasClass("autoclose") || n.model.autoclose) && a(r.blockout).click(function () {
                    r.close()
                })
            }, reposition: function (e) {
                var t = a(e), n = a(window);
                t.data("predefinedWidth") || t.css({width: ""});
                var r = t.outerWidth(!1), i = t.outerHeight(!1), o = n.height() - 10, s = n.width() - 10, u = Math.min(i, o), c = Math.min(r, s);
                t.css({
                    "margin-top": (-u / 2).toString() + "px",
                    "margin-left": (-c / 2).toString() + "px"
                }), i > o ? t.css("overflow-y", "auto").outerHeight(o) : t.css({
                    "overflow-y": "",
                    height: ""
                }), r > s ? t.css("overflow-x", "auto").outerWidth(s) : (t.css("overflow-x", ""), t.data("predefinedWidth") ? t.css("width", t.data("predefinedWidth")) : t.outerWidth(c))
            }
        }), u
    }), define("plugins/http", ["jquery", "knockout"], function (e, t) {
        return {
            callbackParam: "callback", toJSON: function (e) {
                return t.toJSON(e)
            }, get: function (n, r, i) {
                return e.ajax(n, {data: r, headers: t.toJS(i)})
            }, jsonp: function (n, r, i, a) {
                return -1 == n.indexOf("=?") && (i = i || this.callbackParam, n += -1 == n.indexOf("?") ? "?" : "&", n += i + "=?"), e.ajax({
                    url: n,
                    dataType: "jsonp",
                    data: r,
                    headers: t.toJS(a)
                })
            }, put: function (n, r, i) {
                return e.ajax({
                    url: n,
                    data: this.toJSON(r),
                    type: "PUT",
                    contentType: "application/json",
                    dataType: "json",
                    headers: t.toJS(i)
                })
            }, post: function (n, r, i) {
                return e.ajax({
                    url: n,
                    data: this.toJSON(r),
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    headers: t.toJS(i)
                })
            }, remove: function (n, r, i) {
                return e.ajax({url: n, data: r, type: "DELETE", headers: t.toJS(i)})
            }
        }
    }), define("plugins/observable", ["durandal/system", "durandal/binder", "knockout"], function (e, t, n) {
        function r(e) {
            var t = e[0];
            return "_" === t || "$" === t || D && e === D
        }

        function i(t) {
            return !(!t || void 0 === t.nodeType || !e.isNumber(t.nodeType))
        }

        function a(e) {
            if (!e || i(e) || e.ko === n || e.jquery)return !1;
            var t = h.call(e);
            return -1 == m.indexOf(t) && !(e === !0 || e === !1)
        }

        function o(e) {
            var t = {};
            return Object.defineProperty(e, "__observable__", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: t
            }), t
        }

        function s(e, t, n) {
            var r = e.__observable__, i = !0;
            if (!r || !r.__full__) {
                r = r || o(e), r.__full__ = !0, b.forEach(function (n) {
                    t[n] = function () {
                        return w[n].apply(e, arguments)
                    }
                }), g.forEach(function (n) {
                    e[n] = function () {
                        i = !1;
                        var e = x[n].apply(t, arguments);
                        return i = !0, e
                    }
                }), v.forEach(function (n) {
                    e[n] = function () {
                        i && t.valueWillMutate();
                        var r = w[n].apply(e, arguments);
                        return i && t.valueHasMutated(), r
                    }
                }), y.forEach(function (r) {
                    e[r] = function () {
                        for (var a = 0, o = arguments.length; o > a; a++)u(arguments[a], n);
                        i && t.valueWillMutate();
                        var s = w[r].apply(e, arguments);
                        return i && t.valueHasMutated(), s
                    }
                }), e.splice = function () {
                    for (var r = 2, a = arguments.length; a > r; r++)u(arguments[r], n);
                    i && t.valueWillMutate();
                    var o = w.splice.apply(e, arguments);
                    return i && t.valueHasMutated(), o
                };
                for (var a = 0, s = e.length; s > a; a++)u(e[a], n)
            }
        }

        function u(t, r) {
            var i, u;
            if (D && t && t[D] && (r = r ? r.slice(0) : [], r.push(t[D])), a(t) && (i = t.__observable__, !i || !i.__full__)) {
                if (i = i || o(t), i.__full__ = !0, e.isArray(t)) {
                    var c = n.observableArray(t);
                    s(t, c, r)
                } else for (var f in t)if (!p(f) && !i[f]) {
                    var h = Object.getPropertyDescriptor(t, f);
                    h && (h.get || h.set) ? d(t, f, {
                        get: h.get,
                        set: h.set
                    }) : (u = t[f], e.isFunction(u) || l(t, f, u, r))
                }
                S && e.log("Converted", t)
            }
        }

        function c(e, t, n) {
            n ? t ? t.destroyAll || s(t, e) : (t = [], s(t, e)) : u(t), e(t)
        }

        function l(t, r, i, a) {
            var l, d, f = t.__observable__ || o(t);
            if (void 0 === i && (i = t[r]), e.isArray(i))l = n.observableArray(i), s(i, l, a), d = !0; else if ("function" == typeof i) {
                if (!n.isObservable(i))return null;
                l = i
            } else!R && e.isPromise(i) ? (l = n.observable(), i.then(function (t) {
                if (e.isArray(t)) {
                    var r = n.observableArray(t);
                    s(t, r, a), t = r
                }
                l(t)
            })) : (l = n.observable(i), u(i, a));
            return a && a.length > 0 && a.forEach(function (n) {
                e.isArray(i) ? l.subscribe(function (e) {
                    n(t, r, null, e)
                }, null, "arrayChange") : l.subscribe(function (e) {
                    n(t, r, e, null)
                })
            }), Object.defineProperty(t, r, {
                configurable: !0,
                enumerable: !0,
                get: l,
                set: n.isWriteableObservable(l) ? function (t) {
                    t && e.isPromise(t) && !R ? t.then(function (t) {
                        c(l, t, e.isArray(t))
                    }) : c(l, t, d)
                } : void 0
            }), f[r] = l, l
        }

        function d(t, r, i) {
            var a, o = {owner: t, deferEvaluation: !0};
            return "function" == typeof i ? o.read = i : ("value"in i && e.error('For defineProperty, you must not specify a "value" for the property. You must provide a "get" function.'), "function" != typeof i.get && "function" != typeof i.read && e.error('For defineProperty, the third parameter must be either an evaluator function, or an options object containing a function called "get".'), o.read = i.get || i.read, o.write = i.set || i.write), a = n.computed(o), t[r] = a, l(t, r, a)
        }

        var f, p, h = Object.prototype.toString, m = ["[object Function]", "[object String]", "[object Boolean]", "[object Number]", "[object Date]", "[object RegExp]"], g = ["remove", "removeAll", "destroy", "destroyAll", "replace"], v = ["pop", "reverse", "sort", "shift", "slice"], y = ["push", "unshift"], b = ["filter", "map", "reduce", "reduceRight", "forEach", "every", "some"], w = Array.prototype, x = n.observableArray.fn, S = !1, D = void 0, R = !1;
        if (!("getPropertyDescriptor"in Object)) {
            var k = Object.getOwnPropertyDescriptor, C = Object.getPrototypeOf;
            Object.getPropertyDescriptor = function (e, t) {
                for (var n, r = e; r && !(n = k(r, t));)r = C(r);
                return n
            }
        }
        return f = function (e, t) {
            var r, i, a;
            return e ? (r = e.__observable__, r && (i = r[t]) ? i : (a = e[t], n.isObservable(a) ? a : l(e, t, a))) : null
        }, f.defineProperty = d, f.convertProperty = l, f.convertObject = u, f.install = function (e) {
            var n = t.binding;
            t.binding = function (e, t, r) {
                r.applyBindings && !r.skipConversion && u(e), n(e, t)
            }, S = e.logConversion, e.changeDetection && (D = e.changeDetection), R = e.skipPromises, p = e.shouldIgnorePropertyName || r
        }, f
    }), define("plugins/serializer", ["durandal/system"], function (e) {
        return {
            typeAttribute: "type", space: void 0, replacer: function (e, t) {
                if (e) {
                    var n = e[0];
                    if ("_" === n || "$" === n)return void 0
                }
                return t
            }, serialize: function (t, n) {
                return n = void 0 === n ? {} : n, (e.isString(n) || e.isNumber(n)) && (n = {space: n}), JSON.stringify(t, n.replacer || this.replacer, n.space || this.space)
            }, getTypeId: function (e) {
                return e ? e[this.typeAttribute] : void 0
            }, typeMap: {}, registerType: function () {
                var t = arguments[0];
                if (1 == arguments.length) {
                    var n = t[this.typeAttribute] || e.getModuleId(t);
                    this.typeMap[n] = t
                } else this.typeMap[t] = arguments[1]
            }, reviver: function (e, t, n, r) {
                var i = n(t);
                if (i) {
                    var a = r(i);
                    if (a)return a.fromJSON ? a.fromJSON(t) : new a(t)
                }
                return t
            }, deserialize: function (e, t) {
                var n = this;
                t = t || {};
                var r = t.getTypeId || function (e) {
                        return n.getTypeId(e)
                    }, i = t.getConstructor || function (e) {
                        return n.typeMap[e]
                    }, a = t.reviver || function (e, t) {
                        return n.reviver(e, t, r, i)
                    };
                return JSON.parse(e, a)
            }, clone: function (e, t) {
                return this.deserialize(this.serialize(e, t), t)
            }
        }
    }), define("plugins/widget", ["durandal/system", "durandal/composition", "jquery", "knockout"], function (e, t, n, r) {
        function i(e, n) {
            var i = r.utils.domData.get(e, u);
            i || (i = {parts: t.cloneNodes(r.virtualElements.childNodes(e))}, r.virtualElements.emptyNode(e), r.utils.domData.set(e, u, i)), n.parts = i.parts
        }

        var a = {}, o = {}, s = ["model", "view", "kind"], u = "durandal-widget-data", c = {
            getSettings: function (t) {
                var n = r.utils.unwrapObservable(t()) || {};
                if (e.isString(n))return {kind: n};
                for (var i in n)n[i] = -1 != r.utils.arrayIndexOf(s, i) ? r.utils.unwrapObservable(n[i]) : n[i];
                return n
            }, registerKind: function (e) {
                r.bindingHandlers[e] = {
                    init: function () {
                        return {controlsDescendantBindings: !0}
                    }, update: function (t, n, r, a, o) {
                        var s = c.getSettings(n);
                        s.kind = e, i(t, s), c.create(t, s, o, !0)
                    }
                }, r.virtualElements.allowedBindings[e] = !0, t.composeBindings.push(e + ":")
            }, mapKind: function (e, t, n) {
                t && (o[e] = t), n && (a[e] = n)
            }, mapKindToModuleId: function (e) {
                return a[e] || c.convertKindToModulePath(e)
            }, convertKindToModulePath: function (e) {
                return "widgets/" + e + "/viewmodel"
            }, mapKindToViewId: function (e) {
                return o[e] || c.convertKindToViewPath(e)
            }, convertKindToViewPath: function (e) {
                return "widgets/" + e + "/view"
            }, createCompositionSettings: function (e, t) {
                return t.model || (t.model = this.mapKindToModuleId(t.kind)), t.view || (t.view = this.mapKindToViewId(t.kind)), t.preserveContext = !0, t.activate = !0, t.activationData = t, t.mode = "templated", t
            }, create: function (e, n, r, i) {
                i || (n = c.getSettings(function () {
                    return n
                }, e));
                var a = c.createCompositionSettings(e, n);
                t.compose(e, a, r)
            }, install: function (e) {
                if (e.bindingName = e.bindingName || "widget", e.kinds)for (var n = e.kinds, a = 0; a < n.length; a++)c.registerKind(n[a]);
                r.bindingHandlers[e.bindingName] = {
                    init: function () {
                        return {controlsDescendantBindings: !0}
                    }, update: function (e, t, n, r, a) {
                        var o = c.getSettings(t);
                        i(e, o), c.create(e, o, a, !0)
                    }
                }, t.composeBindings.push(e.bindingName + ":"), r.virtualElements.allowedBindings[e.bindingName] = !0
            }
        };
        return c
    }), define("transitions/entrance", ["durandal/system", "durandal/composition", "jquery"], function (e, t, n) {
        function r(e, t) {
            e.classList.remove(t ? "entrance-in-fade" : "entrance-in"), e.classList.remove("entrance-out")
        }

        var i = 100, a = {left: "0px", opacity: 1}, o = {
            left: "",
            top: "",
            right: "",
            bottom: "",
            position: "",
            opacity: ""
        }, s = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/MSIE/), u = !1, c = "Webkit Moz O ms Khtml".split(" "), l = document.createElement("div");
        if (void 0 !== l.style.animationName && (u = !0), !u)for (var d = 0; d < c.length; d++)if (void 0 !== l.style[c[d] + "AnimationName"]) {
            u = !0;
            break
        }
        e.log(u ? s ? "Using CSS3/jQuery mixed animations." : "Using CSS3 animations." : "Using jQuery animations.");
        var f = function (t) {
            return e.defer(function (e) {
                function c() {
                    e.resolve()
                }

                function l() {
                    t.keepScrollPosition || n(document).scrollTop(0)
                }

                function d() {
                    l(), t.triggerAttach(), u ? (r(t.child, h), t.child.classList.add(h ? "entrance-in-fade" : "entrance-in"), setTimeout(function () {
                        r(t.child, h), t.activeView && r(t.activeView, h), p.css(o), c()
                    }, f)) : p.animate(a, {
                        duration: f, easing: "swing", always: function () {
                            p.css(o), c()
                        }
                    })
                }

                if (t.child) {
                    var f = t.duration || 500, p = n(t.child), h = !!t.fadeOnly, m = {
                        display: "block",
                        opacity: 0,
                        position: "absolute",
                        left: h || u ? "0px" : "20px",
                        right: 0,
                        top: 0,
                        bottom: 0
                    };
                    p.css(m), t.activeView ? u && !s ? (r(t.activeView, h), t.activeView.classList.add("entrance-out"), setTimeout(d, i)) : n(t.activeView).fadeOut({
                        duration: i,
                        always: d
                    }) : d()
                } else n(t.activeView).fadeOut(i, c)
            }).promise()
        };
        return f
    }), require(["main"])
}();