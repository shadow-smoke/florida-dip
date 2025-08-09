var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
    var e = 0;
    return function() {
        return e < a.length ? {
            done: !1,
            value: a[e++]
        } : {
            done: !0
        }
    }
}
;
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
}
;
$jscomp.makeIterator = function(a) {
    var e = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return e ? e.call(a) : $jscomp.arrayIterator(a)
}
;
$jscomp.checkStringArgs = function(a, e, h) {
    if (null == a)
        throw new TypeError("The 'this' value for String.prototype." + h + " must not be null or undefined");
    if (e instanceof RegExp)
        throw new TypeError("First argument to String.prototype." + h + " must not be a regular expression");
    return a + ""
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, h) {
    a != Array.prototype && a != Object.prototype && (a[e] = h.value)
}
;
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, e, h, f) {
    if (e) {
        h = $jscomp.global;
        a = a.split(".");
        for (f = 0; f < a.length - 1; f++) {
            var d = a[f];
            d in h || (h[d] = {});
            h = h[d]
        }
        a = a[a.length - 1];
        f = h[a];
        e = e(f);
        e != f && null != e && $jscomp.defineProperty(h, a, {
            configurable: !0,
            writable: !0,
            value: e
        })
    }
}
;
$jscomp.polyfill("String.prototype.startsWith", function(a) {
    return a ? a : function(a, h) {
        var e = $jscomp.checkStringArgs(this, a, "startsWith");
        a += "";
        var d = e.length
          , c = a.length;
        h = Math.max(0, Math.min(h | 0, e.length));
        for (var x = 0; x < c && h < d; )
            if (e[h++] != a[x++])
                return !1;
        return x >= c
    }
}, "es6", "es3");
$jscomp.owns = function(a, e) {
    return Object.prototype.hasOwnProperty.call(a, e)
}
;
$jscomp.polyfill("Object.entries", function(a) {
    return a ? a : function(a) {
        var e = [], f;
        for (f in a)
            $jscomp.owns(a, f) && e.push([f, a[f]]);
        return e
    }
}, "es8", "es3");
$jscomp.polyfill("Array.prototype.fill", function(a) {
    return a ? a : function(a, h, f) {
        var d = this.length || 0;
        0 > h && (h = Math.max(0, d + h));
        if (null == f || f > d)
            f = d;
        f = Number(f);
        0 > f && (f = Math.max(0, d + f));
        for (h = Number(h || 0); h < f; h++)
            this[h] = a;
        return this
    }
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(a) {
    return a ? a : function(a, h) {
        return a === h ? 0 !== a || 1 / a === 1 / h : a !== a && h !== h
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(a) {
    return a ? a : function(a, h) {
        var e = this;
        e instanceof String && (e = String(e));
        var d = e.length;
        h = h || 0;
        for (0 > h && (h = Math.max(h + d, 0)); h < d; h++) {
            var c = e[h];
            if (c === a || Object.is(c, a))
                return !0
        }
        return !1
    }
}, "es7", "es3");
$jscomp.polyfill("String.prototype.includes", function(a) {
    return a ? a : function(a, h) {
        return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, h || 0)
    }
}, "es6", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}
    ;
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
;
$jscomp.Symbol = function() {
    var a = 0;
    return function(e) {
        return $jscomp.SYMBOL_PREFIX + (e || "") + a++
    }
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function() {}
}
;
$jscomp.initSymbolAsyncIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function() {}
}
;
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    }
    ;
    return a
}
;
$jscomp.iteratorFromArray = function(a, e) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var h = 0
      , f = {
        next: function() {
            if (h < a.length) {
                var d = h++;
                return {
                    value: e(d, a[d]),
                    done: !1
                }
            }
            f.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ;
            return f.next()
        }
    };
    f[Symbol.iterator] = function() {
        return f
    }
    ;
    return f
}
;
$jscomp.polyfill("Array.prototype.keys", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(a) {
            return a
        })
    }
}, "es6", "es3");
$jscomp.checkEs6ConformanceViaProxy = function() {
    try {
        var a = {}
          , e = Object.create(new $jscomp.global.Proxy(a,{
            get: function(h, f, d) {
                return h == a && "q" == f && d == e
            }
        }));
        return !0 === e.q
    } catch (h) {
        return !1
    }
}
;
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.polyfill("WeakMap", function(a) {
    function e() {
        if (!a || !Object.seal)
            return !1;
        try {
            var c = Object.seal({})
              , d = Object.seal({})
              , e = new a([[c, 2], [d, 3]]);
            if (2 != e.get(c) || 3 != e.get(d))
                return !1;
            e.delete(c);
            e.set(d, 4);
            return !e.has(c) && 4 == e.get(d)
        } catch (G) {
            return !1
        }
    }
    function h() {}
    function f(a) {
        if (!$jscomp.owns(a, c)) {
            var d = new h;
            $jscomp.defineProperty(a, c, {
                value: d
            })
        }
    }
    function d(a) {
        var c = Object[a];
        c && (Object[a] = function(a) {
            if (a instanceof h)
                return a;
            f(a);
            return c(a)
        }
        )
    }
    if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (a && $jscomp.ES6_CONFORMANCE)
            return a
    } else if (e())
        return a;
    var c = "$jscomp_hidden_" + Math.random();
    d("freeze");
    d("preventExtensions");
    d("seal");
    var x = 0
      , z = function(a) {
        this.id_ = (x += Math.random() + 1).toString();
        if (a) {
            a = $jscomp.makeIterator(a);
            for (var c; !(c = a.next()).done; )
                c = c.value,
                this.set(c[0], c[1])
        }
    };
    z.prototype.set = function(a, d) {
        f(a);
        if (!$jscomp.owns(a, c))
            throw Error("WeakMap key fail: " + a);
        a[c][this.id_] = d;
        return this
    }
    ;
    z.prototype.get = function(a) {
        return $jscomp.owns(a, c) ? a[c][this.id_] : void 0
    }
    ;
    z.prototype.has = function(a) {
        return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_)
    }
    ;
    z.prototype.delete = function(a) {
        return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_) ? delete a[c][this.id_] : !1
    }
    ;
    return z
}, "es6", "es3");
$jscomp.MapEntry = function() {}
;
$jscomp.polyfill("Map", function(a) {
    function e() {
        if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
            return !1;
        try {
            var c = Object.seal({
                x: 4
            })
              , d = new a($jscomp.makeIterator([[c, "s"]]));
            if ("s" != d.get(c) || 1 != d.size || d.get({
                x: 4
            }) || d.set({
                x: 4
            }, "t") != d || 2 != d.size)
                return !1;
            var e = d.entries()
              , f = e.next();
            if (f.done || f.value[0] != c || "s" != f.value[1])
                return !1;
            f = e.next();
            return f.done || 4 != f.value[0].x || "t" != f.value[1] || !e.next().done ? !1 : !0
        } catch (y) {
            return !1
        }
    }
    if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (a && $jscomp.ES6_CONFORMANCE)
            return a
    } else if (e())
        return a;
    $jscomp.initSymbolIterator();
    var h = new WeakMap
      , f = function(a) {
        this.data_ = {};
        this.head_ = x();
        this.size = 0;
        if (a) {
            a = $jscomp.makeIterator(a);
            for (var c; !(c = a.next()).done; )
                c = c.value,
                this.set(c[0], c[1])
        }
    };
    f.prototype.set = function(a, c) {
        a = 0 === a ? 0 : a;
        var e = d(this, a);
        e.list || (e.list = this.data_[e.id] = []);
        e.entry ? e.entry.value = c : (e.entry = {
            next: this.head_,
            previous: this.head_.previous,
            head: this.head_,
            key: a,
            value: c
        },
        e.list.push(e.entry),
        this.head_.previous.next = e.entry,
        this.head_.previous = e.entry,
        this.size++);
        return this
    }
    ;
    f.prototype.delete = function(a) {
        a = d(this, a);
        return a.entry && a.list ? (a.list.splice(a.index, 1),
        a.list.length || delete this.data_[a.id],
        a.entry.previous.next = a.entry.next,
        a.entry.next.previous = a.entry.previous,
        a.entry.head = null,
        this.size--,
        !0) : !1
    }
    ;
    f.prototype.clear = function() {
        this.data_ = {};
        this.head_ = this.head_.previous = x();
        this.size = 0
    }
    ;
    f.prototype.has = function(a) {
        return !!d(this, a).entry
    }
    ;
    f.prototype.get = function(a) {
        return (a = d(this, a).entry) && a.value
    }
    ;
    f.prototype.entries = function() {
        return c(this, function(a) {
            return [a.key, a.value]
        })
    }
    ;
    f.prototype.keys = function() {
        return c(this, function(a) {
            return a.key
        })
    }
    ;
    f.prototype.values = function() {
        return c(this, function(a) {
            return a.value
        })
    }
    ;
    f.prototype.forEach = function(a, c) {
        for (var d = this.entries(), e; !(e = d.next()).done; )
            e = e.value,
            a.call(c, e[1], e[0], this)
    }
    ;
    f.prototype[Symbol.iterator] = f.prototype.entries;
    var d = function(a, c) {
        var d = c && typeof c;
        "object" == d || "function" == d ? h.has(c) ? d = h.get(c) : (d = "" + ++z,
        h.set(c, d)) : d = "p_" + c;
        var e = a.data_[d];
        if (e && $jscomp.owns(a.data_, d))
            for (a = 0; a < e.length; a++) {
                var f = e[a];
                if (c !== c && f.key !== f.key || c === f.key)
                    return {
                        id: d,
                        list: e,
                        index: a,
                        entry: f
                    }
            }
        return {
            id: d,
            list: e,
            index: -1,
            entry: void 0
        }
    }
      , c = function(a, c) {
        var d = a.head_;
        return $jscomp.iteratorPrototype(function() {
            if (d) {
                for (; d.head != a.head_; )
                    d = d.previous;
                for (; d.next != d.head; )
                    return d = d.next,
                    {
                        done: !1,
                        value: c(d)
                    };
                d = null
            }
            return {
                done: !0,
                value: void 0
            }
        })
    }
      , x = function() {
        var a = {};
        return a.previous = a.next = a.head = a
    }
      , z = 0;
    return f
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
    function e() {
        if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
            return !1;
        try {
            var e = Object.seal({
                x: 4
            })
              , d = new a($jscomp.makeIterator([e]));
            if (!d.has(e) || 1 != d.size || d.add(e) != d || 1 != d.size || d.add({
                x: 4
            }) != d || 2 != d.size)
                return !1;
            var c = d.entries()
              , h = c.next();
            if (h.done || h.value[0] != e || h.value[1] != e)
                return !1;
            h = c.next();
            return h.done || h.value[0] == e || 4 != h.value[0].x || h.value[1] != h.value[0] ? !1 : c.next().done
        } catch (z) {
            return !1
        }
    }
    if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (a && $jscomp.ES6_CONFORMANCE)
            return a
    } else if (e())
        return a;
    $jscomp.initSymbolIterator();
    var h = function(a) {
        this.map_ = new Map;
        if (a) {
            a = $jscomp.makeIterator(a);
            for (var d; !(d = a.next()).done; )
                this.add(d.value)
        }
        this.size = this.map_.size
    };
    h.prototype.add = function(a) {
        a = 0 === a ? 0 : a;
        this.map_.set(a, a);
        this.size = this.map_.size;
        return this
    }
    ;
    h.prototype.delete = function(a) {
        a = this.map_.delete(a);
        this.size = this.map_.size;
        return a
    }
    ;
    h.prototype.clear = function() {
        this.map_.clear();
        this.size = 0
    }
    ;
    h.prototype.has = function(a) {
        return this.map_.has(a)
    }
    ;
    h.prototype.entries = function() {
        return this.map_.entries()
    }
    ;
    h.prototype.values = function() {
        return this.map_.values()
    }
    ;
    h.prototype.keys = h.prototype.values;
    h.prototype[Symbol.iterator] = h.prototype.values;
    h.prototype.forEach = function(a, d) {
        var c = this;
        this.map_.forEach(function(e) {
            return a.call(d, e, e, c)
        })
    }
    ;
    return h
}, "es6", "es3");
$jscomp.polyfill("String.prototype.repeat", function(a) {
    return a ? a : function(a) {
        var e = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > a || 1342177279 < a)
            throw new RangeError("Invalid count value");
        a |= 0;
        for (var f = ""; a; )
            if (a & 1 && (f += e),
            a >>>= 1)
                e += e;
        return f
    }
}, "es6", "es3");
var tilegames = tilegames || {};
tilegames.Map = function(a, e) {
    this.MIN_SCALE_FOR_LABELS = .8;
    this.canvasSize = a;
    this.scale = e;
    this.playerDescriptions = {
        Austria: {
            possessive: "Austrian"
        },
        England: {
            possessive: "English"
        },
        France: {
            possessive: "French"
        },
        Germany: {
            possessive: "German"
        },
        Italy: {
            possessive: "Italian"
        },
        Russia: {
            possessive: "Russian"
        },
        Turkey: {
            possessive: "Turkish"
        }
    };
    this.unitNames = {
        F: "Fleet",
        A: "Army"
    };
    this.renderAttrs = {
        l: {
            fill: "#dfddc9",
            "fill-opacity": "0",
            stroke: "#fff",
            "stroke-width": 1
        },
        w: {
            fill: "#d0d0f0",
            "fill-opacity": "0",
            stroke: "#fff",
            "stroke-width": 1
        },
        highlight_fills: {
            l: "#f9f9cc",
            w: "#bbc"
        },
        text: {
            "font-family": "Verdana",
            "font-size": "9pt",
            fill: "#000",
            "fill-opacity": 1
        },
        redline: {
            stroke: "#f33",
            "stroke-width": 1,
            "fill-opacity": 0
        },
        shape: {
            fill: "#000",
            "fill-opacity": 0,
            "stroke-width": 0
        },
        selected_shape: {
            fill: "#fa481c",
            "fill-opacity": .3
        },
        selected_shape_secondary: {
            fill: "#fa481c",
            "fill-opacity": .1
        }
    };
    this.territories = {
        Tus: {
            name: "Tuscany",
            center: {
                x: 240,
                y: 425
            },
            l_neighbors: {
                Pie: 1,
                Rom: 1,
                Ven: 1
            },
            type: "l",
            unit_center: {
                x: 247,
                y: 430
            },
            w_neighbors: {
                Pie: 1,
                LYO: 1,
                TYS: 1,
                Rom: 1
            },
            path: "M233,415 L238,431 L247,442 L250,438 L263,434 L253,418 L246,416 L240,415 L236,411Z"
        },
        Con: {
            name: "Constantinople",
            center: {
                x: 437,
                y: 486
            },
            sc: {
                x: 424,
                y: 475
            },
            l_neighbors: {
                Bul: 1,
                Ank: 1,
                Smy: 1
            },
            type: "l",
            unit_center: {
                x: 444,
                y: 471
            },
            w_neighbors: {
                BLA: 1,
                Bulsc: 1,
                AEG: 1,
                Bulec: 1,
                Ank: 1,
                Smy: 1
            },
            path: "M408,470 L410,473 L414,475 L410,482 L409,487 L417,486 L417,489 L423,487 L432,493 L452,495 L466,491 L468,479 L468,461 L464,457 L442,460 L440,458 L430,455 L426,450 L420,451 L412,454 L413,464Z"
        },
        Nap: {
            name: "Naples",
            center: {
                x: 294,
                y: 492
            },
            sc: {
                x: 278,
                y: 469
            },
            l_neighbors: {
                Rom: 1,
                Apu: 1
            },
            type: "l",
            unit_center: {
                x: 299,
                y: 505
            },
            w_neighbors: {
                TYS: 1,
                Rom: 1,
                Apu: 1,
                ION: 1
            },
            path: "M271,464 L276,474 L290,487 L294,502 L289,511 L290,514 L295,515 L308,500 L311,491 L304,484 L293,481 L279,458Z"
        },
        ADR: {
            name: "Adriatic Sea",
            center: {
                x: 308,
                y: 460
            },
            l_neighbors: {
                Tri: 1,
                Alb: 1,
                Apu: 1,
                Ven: 1
            },
            type: "w",
            unit_center: {
                x: 296,
                y: 441
            },
            w_neighbors: {
                ION: 1
            },
            path: "M322,480 L297,456 L300,453 L290,453 L278,443 L272,424 L260,417 L261,401 L270,398 L276,399 L275,403 L278,410 L282,401 L286,402 L289,418 L306,436 L331,454 L331,477 L335,480Z"
        },
        TYS: {
            name: "Tyrrhenian Sea",
            center: {
                x: 245,
                y: 495
            },
            l_neighbors: {
                Tun: 1,
                Rom: 1,
                Tus: 1,
                Nap: 1
            },
            type: "w",
            unit_center: {
                x: 246,
                y: 483
            },
            w_neighbors: {
                LYO: 1,
                WES: 1,
                ION: 1
            },
            path: "M238,431 L247,442 L248,447 L256,458 L271,464 L276,474 L290,487 L294,502 L289,511 L285,511 L285,508 L276,510 L263,510 L257,507 L252,508 L247,513 L236,524 L233,523 L224,527 L223,518 L218,516 L218,490 L220,490 L224,468 L222,458 L218,458 L218,454 L223,450 L225,444 L225,436 L224,431Z"
        },
        Tri: {
            name: "Trieste",
            center: {
                x: 305,
                y: 425
            },
            sc: {
                x: 290,
                y: 396
            },
            l_neighbors: {
                Ser: 1,
                Alb: 1,
                Tyr: 1,
                Bud: 1,
                Vie: 1,
                Ven: 1
            },
            type: "l",
            unit_center: {
                x: 305,
                y: 412
            },
            w_neighbors: {
                Alb: 1,
                ADR: 1,
                Ven: 1
            },
            path: "M276,399 L275,403 L278,410 L282,401 L286,402 L289,418 L306,436 L331,454 L330,445 L337,446 L330,437 L327,429 L331,424 L330,416 L332,410 L323,408 L321,398 L311,394 L308,383 L299,385 L294,380 L289,385 L276,386 L279,389Z"
        },
        Bel: {
            name: "Belgium",
            center: {
                x: 192,
                y: 321
            },
            sc: {
                x: 186,
                y: 305
            },
            l_neighbors: {
                Hol: 1,
                Ruh: 1,
                Bur: 1,
                Pic: 1
            },
            type: "l",
            unit_center: {
                x: 197,
                y: 317
            },
            w_neighbors: {
                NTH: 1,
                Hol: 1,
                ENG: 1,
                Pic: 1
            },
            path: "M191,299 L194,303 L206,306 L205,311 L208,315 L210,326 L205,331 L192,323 L184,315 L169,311 L173,301Z"
        },
        NWG: {
            name: "Norwegian Sea",
            center: {
                x: 220,
                y: 70
            },
            l_neighbors: {
                Cly: 1,
                Nwy: 1,
                Edi: 1
            },
            type: "w",
            unit_center: {
                x: 220,
                y: 90
            },
            w_neighbors: {
                NTH: 1,
                NAO: 1,
                BAR: 1
            },
            path: "M362,33 L357,39 L343,44 L324,54 L320,64 L310,75 L309,84 L303,86 L292,111 L277,132 L269,134 L264,142 L258,141 L236,154 L198,154 L171,181 L171,197 L158,193 L152,194 L154,188 L161,185 L162,181 L148,177 L148,0 L362,0Z"
        },
        Mar: {
            name: "Marseilles",
            center: {
                x: 173,
                y: 412
            },
            sc: {
                x: 190,
                y: 412
            },
            l_neighbors: {
                Pie: 1,
                Gas: 1,
                Spa: 1,
                Bur: 1
            },
            type: "l",
            unit_center: {
                x: 184,
                y: 402
            },
            w_neighbors: {
                Spasc: 1,
                Pie: 1,
                LYO: 1
            },
            path: "M142,417 L149,403 L157,397 L168,395 L173,396 L178,390 L178,381 L194,382 L197,385 L203,379 L207,386 L204,390 L207,396 L201,399 L204,402 L203,410 L211,416 L198,421 L188,422 L176,417 L169,412 L158,418 L158,425 L154,427Z"
        },
        Kie: {
            name: "Kiel",
            center: {
                x: 237,
                y: 285
            },
            sc: {
                x: 254,
                y: 278
            },
            l_neighbors: {
                Den: 1,
                Ber: 1,
                Hol: 1,
                Ruh: 1,
                Mun: 1
            },
            type: "l",
            unit_center: {
                x: 243,
                y: 295
            },
            w_neighbors: {
                BAL: 1,
                Den: 1,
                HEL: 1,
                Ber: 1,
                Hol: 1
            },
            path: "M244,254 L243,257 L245,263 L244,270 L244,273 L235,277 L234,274 L230,273 L226,275 L227,280 L225,292 L220,298 L215,297 L213,302 L232,308 L241,316 L243,322 L263,310 L261,296 L264,293 L262,287 L266,283 L266,275 L261,274 L260,269 L256,266 L256,263 L254,255Z"
        },
        MAO: {
            name: "Mid-Atlantic Ocean",
            center: {
                x: 50,
                y: 355
            },
            l_neighbors: {
                Spasc: 1,
                Gas: 1,
                Spanc: 1,
                Naf: 1,
                Por: 1,
                Bre: 1
            },
            type: "w",
            unit_center: {
                x: 23,
                y: 355
            },
            w_neighbors: {
                IRI: 1,
                WES: 1,
                NAO: 1,
                ENG: 1
            },
            path: "M102,317 L100,322 L103,328 L109,329 L123,344 L122,350 L123,357 L128,363 L121,382 L122,384 L112,399 L101,396 L96,397 L72,384 L59,381 L54,375 L48,374 L46,378 L39,375 L33,381 L35,384 L32,396 L30,406 L17,427 L14,427 L10,433 L13,440 L15,441 L12,450 L13,454 L8,462 L19,469 L27,468 L33,475 L34,484 L37,490 L37,495 L33,496 L17,518 L0,520 L0,273 L58,273Z"
        },
        Gre: {
            name: "Greece",
            center: {
                x: 352,
                y: 490
            },
            sc: {
                x: 378,
                y: 507
            },
            l_neighbors: {
                Ser: 1,
                Alb: 1,
                Bul: 1
            },
            type: "l",
            unit_center: {
                x: 366,
                y: 515
            },
            w_neighbors: {
                Alb: 1,
                Bulsc: 1,
                AEG: 1,
                ION: 1
            },
            path: "M339,487 L346,498 L350,498 L347,500 L352,508 L367,507 L371,511 L355,510 L350,514 L357,521 L359,533 L360,528 L367,536 L368,531 L376,537 L371,520 L378,521 L377,513 L386,516 L385,509 L370,494 L371,491 L378,494 L368,483 L371,477 L379,484 L382,483 L381,477 L386,478 L380,472 L392,472 L388,460 L376,464 L369,464 L361,467 L356,471 L350,471 L350,477Z"
        },
        NAO: {
            name: "North Atlantic Ocean",
            center: {
                x: 65,
                y: 180
            },
            l_neighbors: {
                Cly: 1,
                Lvp: 1
            },
            type: "w",
            unit_center: {
                x: 65,
                y: 200
            },
            w_neighbors: {
                IRI: 1,
                MAO: 1,
                NWG: 1
            },
            path: "M70,261 L64,250 L67,242 L71,245 L81,234 L74,228 L80,225 L78,218 L82,217 L89,220 L94,220 L95,218 L94,216 L97,216 L101,212 L110,212 L119,217 L120,227 L130,227 L130,223 L138,217 L138,214 L130,208 L129,197 L139,189 L140,182 L148,177 L148,0 L0,0 L0,273 L58,273Z"
        },
        Cly: {
            name: "Clyde",
            center: {
                x: 133,
                y: 201
            },
            l_neighbors: {
                Lvp: 1,
                Edi: 1
            },
            type: "l",
            unit_center: {
                x: 139,
                y: 188
            },
            w_neighbors: {
                NAO: 1,
                Lvp: 1,
                NWG: 1,
                Edi: 1
            },
            path: "M138,214 L130,208 L129,197 L139,189 L140,182 L148,177 L162,181 L161,185 L154,188 L152,194 L146,200 L144,213Z"
        },
        Hol: {
            name: "Holland",
            center: {
                x: 210,
                y: 290
            },
            sc: {
                x: 205,
                y: 284
            },
            l_neighbors: {
                Ruh: 1,
                Kie: 1,
                Bel: 1
            },
            type: "l",
            unit_center: {
                x: 205,
                y: 297
            },
            w_neighbors: {
                NTH: 1,
                HEL: 1,
                Kie: 1,
                Bel: 1
            },
            path: "M226,275 L227,280 L225,292 L220,298 L215,297 L213,302 L210,313 L208,315 L205,311 L206,306 L194,303 L191,299 L198,289 L205,276 L205,279 L207,279 L211,274Z"
        },
        Swe: {
            name: "Sweden",
            center: {
                x: 300,
                y: 170
            },
            sc: {
                x: 323,
                y: 196
            },
            l_neighbors: {
                Fin: 1,
                Den: 1,
                Nwy: 1
            },
            type: "l",
            unit_center: {
                x: 315,
                y: 140
            },
            w_neighbors: {
                Fin: 1,
                BAL: 1,
                Den: 1,
                Nwy: 1,
                BOT: 1,
                SKA: 1
            },
            path: "M275,203 L277,218 L276,224 L282,236 L279,240 L279,243 L282,253 L289,254 L294,245 L305,244 L312,229 L311,220 L314,209 L322,206 L328,203 L331,193 L326,183 L320,182 L321,161 L330,146 L343,138 L351,128 L347,121 L349,112 L355,104 L362,107 L356,71 L342,61 L341,65 L330,64 L332,74 L324,71 L311,101 L308,104 L309,115 L300,126 L301,132 L292,133 L290,164 L285,170 L287,177 L279,204Z"
        },
        Ank: {
            name: "Ankara",
            center: {
                x: 510,
                y: 455
            },
            sc: {
                x: 482,
                y: 469
            },
            l_neighbors: {
                Con: 1,
                Arm: 1,
                Smy: 1
            },
            type: "l",
            unit_center: {
                x: 500,
                y: 460
            },
            w_neighbors: {
                BLA: 1,
                Con: 1,
                Arm: 1
            },
            path: "M555,438 L551,437 L520,441 L514,438 L511,440 L502,433 L481,438 L470,447 L464,457 L468,461 L468,479 L466,491 L473,491 L490,480 L501,482 L508,480 L531,460 L546,462 L555,460 L557,449Z"
        },
        Arm: {
            name: "Armenia",
            center: {
                x: 585,
                y: 467
            },
            l_neighbors: {
                Syr: 1,
                Sev: 1,
                Ank: 1,
                Smy: 1
            },
            type: "l",
            unit_center: {
                x: 576,
                y: 456
            },
            w_neighbors: {
                BLA: 1,
                Sev: 1,
                Ank: 1
            },
            path: "M609,493 L584,478 L563,479 L562,471 L556,467 L555,460 L557,449 L555,438 L570,427 L589,442 L594,439 L603,441 L609,440Z"
        },
        Bud: {
            name: "Budapest",
            center: {
                x: 350,
                y: 390
            },
            sc: {
                x: 326,
                y: 376
            },
            l_neighbors: {
                Tri: 1,
                Ser: 1,
                Gal: 1,
                Vie: 1,
                Rum: 1
            },
            type: "l",
            unit_center: {
                x: 353,
                y: 378
            },
            w_neighbors: {},
            path: "M394,376 L395,382 L401,385 L406,396 L401,402 L387,402 L367,406 L365,412 L360,413 L342,410 L338,412 L335,410 L332,410 L323,408 L321,398 L311,394 L308,383 L311,375 L322,370 L335,354 L337,350 L350,347 L360,351 L368,353 L377,360 L378,363 L384,365Z"
        },
        Pic: {
            name: "Picardy",
            center: {
                x: 168,
                y: 326
            },
            l_neighbors: {
                Par: 1,
                Bur: 1,
                Bel: 1,
                Bre: 1
            },
            type: "l",
            unit_center: {
                x: 168,
                y: 319
            },
            w_neighbors: {
                ENG: 1,
                Bel: 1,
                Bre: 1
            },
            path: "M169,311 L153,315 L155,320 L150,319 L148,329 L159,331 L165,331 L172,328 L188,332 L192,323 L184,315Z"
        },
        Ven: {
            name: "Venice",
            center: {
                x: 245,
                y: 407
            },
            sc: {
                x: 263,
                y: 390
            },
            l_neighbors: {
                Tri: 1,
                Pie: 1,
                Tyr: 1,
                Rom: 1,
                Apu: 1,
                Tus: 1
            },
            type: "l",
            unit_center: {
                x: 250,
                y: 408
            },
            w_neighbors: {
                Tri: 1,
                ADR: 1,
                Apu: 1
            },
            path: "M278,443 L272,424 L260,417 L261,401 L270,398 L276,399 L279,389 L276,386 L268,385 L259,388 L255,394 L250,397 L246,392 L233,404 L236,411 L240,415 L246,416 L253,418 L263,434 L274,447Z"
        },
        Ukr: {
            name: "Ukraine",
            center: {
                x: 420,
                y: 340
            },
            l_neighbors: {
                Sev: 1,
                Mos: 1,
                Gal: 1,
                War: 1,
                Rum: 1
            },
            type: "l",
            unit_center: {
                x: 427,
                y: 327
            },
            w_neighbors: {},
            path: "M383,327 L385,332 L399,338 L404,354 L403,360 L411,361 L414,372 L423,376 L432,372 L434,360 L445,350 L460,345 L466,307 L470,303 L468,295 L456,292 L390,306 L386,309Z"
        },
        Ruh: {
            name: "Ruhr",
            center: {
                x: 215,
                y: 330
            },
            l_neighbors: {
                Hol: 1,
                Mun: 1,
                Kie: 1,
                Bel: 1,
                Bur: 1
            },
            type: "l",
            unit_center: {
                x: 223,
                y: 320
            },
            w_neighbors: {},
            path: "M213,302 L210,313 L208,315 L210,326 L205,331 L204,338 L211,346 L219,344 L237,322 L243,322 L241,316 L232,308Z"
        },
        Stp: {
            name: "St Petersburg",
            coasts: {
                sc: {
                    x: 418,
                    y: 205,
                    path: "M414,147 L410,152 L412,161 L402,177 L403,183 L411,184 L414,187 L408,187 L400,192 L399,197 L387,196 L371,198 L369,202 L372,205 L382,206 L394,205 L405,217 L409,228 L421,229 L428,225 L439,211 L447,209 L451,213 L457,210 L456,207 L458,194 L476,183Z"
                },
                nc: {
                    x: 472,
                    y: 122,
                    path: "M534,164 L564,159 L573,143 L598,132 L609,117 L609,0 L540,0 L535,9 L530,6 L517,19 L516,33 L513,38 L513,23 L507,20 L505,26 L499,33 L492,48 L495,58 L488,60 L479,57 L477,55 L481,50 L473,43 L466,45 L472,62 L478,66 L478,74 L472,72 L468,74 L457,91 L469,100 L467,106 L462,109 L444,101 L442,110 L447,115 L454,119 L452,122 L434,118 L426,103 L426,94 L414,88 L412,83 L445,84 L457,79 L459,66 L453,61 L417,47 L405,49 L401,45 L397,48 L388,61 L387,68 L393,73 L392,92 L401,110 L402,118 L410,130 L414,147 L476,183 L489,184 L515,169Z"
                }
            },
            center: {
                x: 460,
                y: 149
            },
            sc: {
                x: 418,
                y: 187
            },
            l_neighbors: {
                Fin: 1,
                Lvn: 1,
                Nwy: 1,
                Mos: 1
            },
            type: "l",
            unit_center: {
                x: 500,
                y: 140
            },
            w_neighbors: {
                sc: {
                    Fin: 1,
                    Lvn: 1,
                    BOT: 1
                },
                nc: {
                    Nwy: 1,
                    BAR: 1
                }
            },
            path: "M534,164 L564,159 L573,143 L598,132 L609,117 L609,0 L540,0 L535,9 L530,6 L517,19 L516,33 L513,38 L513,23 L507,20 L505,26 L499,33 L492,48 L495,58 L488,60 L479,57 L477,55 L481,50 L473,43 L466,45 L472,62 L478,66 L478,74 L472,72 L468,74 L457,91 L469,100 L467,106 L462,109 L444,101 L442,110 L447,115 L454,119 L452,122 L434,118 L426,103 L426,94 L414,88 L412,83 L445,84 L457,79 L459,66 L453,61 L417,47 L405,49 L401,45 L397,48 L388,61 L387,68 L393,73 L392,92 L401,110 L402,118 L410,130 L414,147 L410,152 L412,161 L402,177 L403,183 L411,184 L414,187 L408,187 L400,192 L399,197 L387,196 L371,198 L369,202 L372,205 L382,206 L394,205 L405,217 L409,228 L421,229 L428,225 L439,211 L447,209 L451,213 L457,210 L456,207 L458,194 L476,183 L489,184 L515,169Z"
        },
        Den: {
            name: "Denmark",
            center: {
                x: 250,
                y: 235
            },
            sc: {
                x: 272,
                y: 252
            },
            l_neighbors: {
                Swe: 1,
                Kie: 1
            },
            type: "l",
            unit_center: {
                x: 256,
                y: 245
            },
            w_neighbors: {
                Swe: 1,
                BAL: 1,
                NTH: 1,
                HEL: 1,
                Kie: 1,
                SKA: 1
            },
            path: "M279,243 L275,242 L269,243 L266,240 L267,234 L266,221 L263,223 L248,224 L245,237 L243,247 L244,254 L254,255 L266,255 L271,260 L278,254 L277,250 L280,248Z"
        },
        Par: {
            name: "Paris",
            center: {
                x: 155,
                y: 358
            },
            sc: {
                x: 177,
                y: 338
            },
            l_neighbors: {
                Gas: 1,
                Bur: 1,
                Pic: 1,
                Bre: 1
            },
            type: "l",
            unit_center: {
                x: 162,
                y: 346
            },
            w_neighbors: {},
            path: "M146,365 L149,372 L156,374 L165,365 L185,344 L188,332 L172,328 L165,331 L159,331 L148,329 L146,337Z"
        },
        Fin: {
            name: "Finland",
            center: {
                x: 375,
                y: 160
            },
            l_neighbors: {
                Swe: 1,
                Stp: 1,
                Nwy: 1
            },
            type: "l",
            unit_center: {
                x: 385,
                y: 143
            },
            w_neighbors: {
                Stpsc: 1,
                Swe: 1,
                BOT: 1
            },
            path: "M362,107 L368,108 L372,120 L366,121 L359,136 L345,151 L347,160 L350,165 L348,178 L349,184 L357,186 L365,191 L384,185 L402,177 L412,161 L410,152 L414,147 L410,130 L402,118 L401,110 L392,92 L393,73 L387,68 L388,61 L386,58 L388,54 L379,48 L370,49 L369,61 L355,62 L346,54 L342,61 L356,71Z"
        },
        ENG: {
            name: "English Channel",
            center: {
                x: 135,
                y: 306
            },
            l_neighbors: {
                Lon: 1,
                Wal: 1,
                Bel: 1,
                Bre: 1,
                Pic: 1
            },
            type: "w",
            unit_center: {
                x: 119,
                y: 307
            },
            w_neighbors: {
                IRI: 1,
                NTH: 1,
                MAO: 1
            },
            path: "M173,301 L169,311 L153,315 L155,320 L150,319 L144,318 L142,312 L136,310 L136,326 L124,323 L122,318 L102,317 L88,303 L100,291 L110,292 L120,295 L124,291 L134,294 L147,295 L160,298 L168,296Z"
        },
        Yor: {
            name: "Yorkshire",
            center: {
                x: 155,
                y: 254
            },
            l_neighbors: {
                Lon: 1,
                Wal: 1,
                Lvp: 1,
                Edi: 1
            },
            type: "l",
            unit_center: {
                x: 161,
                y: 254
            },
            w_neighbors: {
                Lon: 1,
                NTH: 1,
                Edi: 1
            },
            path: "M163,226 L163,239 L168,246 L170,252 L169,265 L166,269 L153,271 L150,264 L151,248 L155,239 L155,228Z"
        },
        Mun: {
            name: "Munich",
            center: {
                x: 235,
                y: 360
            },
            sc: {
                x: 258,
                y: 359
            },
            l_neighbors: {
                Sil: 1,
                Tyr: 1,
                Ber: 1,
                Boh: 1,
                Ruh: 1,
                Kie: 1,
                Bur: 1
            },
            type: "l",
            unit_center: {
                x: 243,
                y: 347
            },
            w_neighbors: {},
            path: "M234,366 L243,370 L246,369 L250,371 L267,368 L271,370 L269,362 L275,362 L281,356 L276,346 L268,343 L264,329 L266,325 L278,326 L288,321 L284,314 L288,305 L263,310 L243,322 L237,322 L219,344 L211,346 L213,352 L209,363 L222,365 L225,362 L232,363Z"
        },
        Wal: {
            name: "Wales",
            center: {
                x: 130,
                y: 275
            },
            l_neighbors: {
                Lon: 1,
                Lvp: 1,
                Yor: 1
            },
            type: "l",
            unit_center: {
                x: 125,
                y: 285
            },
            w_neighbors: {
                IRI: 1,
                Lon: 1,
                Lvp: 1,
                ENG: 1
            },
            path: "M100,291 L112,287 L122,281 L130,282 L127,276 L119,272 L116,272 L115,265 L128,262 L143,262 L150,264 L153,271 L150,277 L145,281 L147,295 L134,294 L124,291 L120,295 L110,292Z"
        },
        BAL: {
            name: "Baltic Sea",
            center: {
                x: 308,
                y: 260
            },
            l_neighbors: {
                Swe: 1,
                Den: 1,
                Lvn: 1,
                Ber: 1,
                Kie: 1,
                Pru: 1
            },
            type: "w",
            unit_center: {
                x: 323,
                y: 250
            },
            w_neighbors: {
                BOT: 1,
                SKA: 1
            },
            path: "M266,255 L271,260 L278,254 L277,250 L280,248 L279,243 L282,253 L289,254 L294,245 L305,244 L312,229 L311,220 L359,220 L349,229 L347,243 L347,248 L348,254 L344,262 L337,264 L334,273 L328,274 L326,265 L314,266 L307,273 L294,275 L286,274 L287,267 L280,266 L266,275 L261,274 L260,269 L256,266 L256,263 L254,255Z"
        },
        Pie: {
            name: "Piedmont",
            center: {
                x: 215,
                y: 408
            },
            l_neighbors: {
                Tyr: 1,
                Tus: 1,
                Mar: 1,
                Ven: 1
            },
            type: "l",
            unit_center: {
                x: 220,
                y: 399
            },
            w_neighbors: {
                LYO: 1,
                Tus: 1,
                Mar: 1
            },
            path: "M207,386 L204,390 L207,396 L201,399 L204,402 L203,410 L211,416 L222,410 L233,415 L236,411 L233,404 L246,392 L243,388 L229,385 L227,390 L221,385 L213,387Z"
        },
        Ser: {
            name: "Serbia",
            center: {
                x: 350,
                y: 450
            },
            sc: {
                x: 343,
                y: 419
            },
            l_neighbors: {
                Tri: 1,
                Alb: 1,
                Bul: 1,
                Gre: 1,
                Bud: 1,
                Rum: 1
            },
            type: "l",
            unit_center: {
                x: 351,
                y: 438
            },
            w_neighbors: {},
            path: "M365,412 L360,413 L342,410 L338,412 L335,410 L332,410 L330,416 L331,424 L327,429 L330,437 L337,446 L346,452 L346,466 L350,471 L356,471 L361,467 L369,464 L365,461 L371,456 L366,439 L371,438 L368,433 L365,425 L367,421Z"
        },
        SKA: {
            name: "Skagerrak",
            center: {
                x: 255,
                y: 220
            },
            l_neighbors: {
                Swe: 1,
                Den: 1,
                Nwy: 1
            },
            type: "w",
            unit_center: {
                x: 260,
                y: 212
            },
            w_neighbors: {
                NTH: 1,
                BAL: 1
            },
            path: "M241,209 L246,210 L266,201 L270,193 L275,203 L277,218 L276,224 L282,236 L279,240 L279,243 L275,242 L269,243 L266,240 L267,234 L266,221 L263,223 L248,224 L241,224Z"
        },
        BOT: {
            name: "Gulf of Bothnia",
            center: {
                x: 328,
                y: 175
            },
            l_neighbors: {
                Fin: 1,
                Stpsc: 1,
                Swe: 1,
                Lvn: 1
            },
            type: "w",
            unit_center: {
                x: 348,
                y: 199
            },
            w_neighbors: {
                BAL: 1
            },
            path: "M311,220 L314,209 L322,206 L328,203 L331,193 L326,183 L320,182 L321,161 L330,146 L343,138 L351,128 L347,121 L349,112 L355,104 L362,107 L368,108 L372,120 L366,121 L359,136 L345,151 L347,160 L350,165 L348,178 L349,184 L357,186 L365,191 L384,185 L402,177 L403,183 L411,184 L414,187 L408,187 L400,192 L399,197 L387,196 L371,198 L369,202 L365,204 L368,210 L372,213 L373,221 L377,227 L373,229 L366,228 L359,220Z"
        },
        Ber: {
            name: "Berlin",
            center: {
                x: 272,
                y: 292
            },
            sc: {
                x: 281,
                y: 298
            },
            l_neighbors: {
                Sil: 1,
                Mun: 1,
                Kie: 1,
                Pru: 1
            },
            type: "l",
            unit_center: {
                x: 279,
                y: 283
            },
            w_neighbors: {
                BAL: 1,
                Kie: 1,
                Pru: 1
            },
            path: "M294,275 L286,274 L287,267 L280,266 L266,275 L266,283 L262,287 L264,293 L261,296 L263,310 L288,305 L296,300 L297,296 L292,290Z"
        },
        LYO: {
            name: "Gulf of Lyon",
            center: {
                x: 170,
                y: 457
            },
            l_neighbors: {
                Spasc: 1,
                Pie: 1,
                Tus: 1,
                Mar: 1
            },
            type: "w",
            unit_center: {
                x: 180,
                y: 444
            },
            w_neighbors: {
                TYS: 1,
                WES: 1
            },
            path: "M115,469 L110,461 L124,444 L131,439 L146,438 L157,432 L158,425 L158,418 L169,412 L176,417 L188,422 L198,421 L211,416 L222,410 L233,415 L238,431 L224,431 L221,434 L211,436 L213,451 L218,454 L218,458 L214,461 L206,462 L205,466 L154,466 L148,463 L142,469Z"
        },
        Smy: {
            name: "Smyrna",
            center: {
                x: 460,
                y: 510
            },
            sc: {
                x: 424,
                y: 502
            },
            l_neighbors: {
                Syr: 1,
                Con: 1,
                Arm: 1,
                Ank: 1
            },
            type: "l",
            unit_center: {
                x: 490,
                y: 505
            },
            w_neighbors: {
                EAS: 1,
                Syr: 1,
                Con: 1,
                AEG: 1
            },
            path: "M417,489 L420,495 L417,498 L417,507 L423,510 L427,524 L435,523 L435,530 L441,526 L447,528 L453,534 L464,531 L466,521 L475,520 L485,528 L491,530 L505,526 L511,514 L520,517 L527,508 L530,509 L536,494 L545,486 L555,484 L563,479 L562,471 L556,467 L555,460 L546,462 L531,460 L508,480 L501,482 L490,480 L473,491 L466,491 L452,495 L432,493 L423,487Z"
        },
        ION: {
            name: "Ionian Sea",
            center: {
                x: 315,
                y: 520
            },
            l_neighbors: {
                Alb: 1,
                Tun: 1,
                Gre: 1,
                Apu: 1,
                Nap: 1
            },
            type: "w",
            unit_center: {
                x: 324,
                y: 540
            },
            w_neighbors: {
                EAS: 1,
                AEG: 1,
                TYS: 1,
                ADR: 1
            },
            path: "M289,511 L290,514 L295,515 L308,500 L311,491 L304,484 L310,480 L318,485 L322,485 L322,480 L335,480 L339,487 L346,498 L350,498 L347,500 L352,508 L367,507 L371,511 L355,510 L350,514 L357,521 L359,533 L360,528 L367,536 L368,531 L376,537 L383,544 L380,547 L383,550 L400,554 L400,559 L232,559 L234,551 L232,544 L225,535 L231,531 L236,524 L247,513 L258,519 L273,531 L281,532 L282,521 L285,513 L285,511Z"
        },
        Pru: {
            name: "Prussia",
            center: {
                x: 335,
                y: 283
            },
            l_neighbors: {
                Sil: 1,
                Lvn: 1,
                Ber: 1,
                War: 1
            },
            type: "l",
            unit_center: {
                x: 315,
                y: 283
            },
            w_neighbors: {
                BAL: 1,
                Ber: 1,
                Lvn: 1
            },
            path: "M347,243 L347,248 L348,254 L344,262 L337,264 L334,273 L328,274 L326,265 L314,266 L307,273 L294,275 L292,290 L297,296 L296,300 L320,303 L324,299 L326,292 L341,287 L345,289 L359,286 L365,281 L367,265 L362,260 L356,261 L354,251Z"
        },
        Gal: {
            name: "Galicia",
            center: {
                x: 355,
                y: 343
            },
            l_neighbors: {
                Sil: 1,
                Boh: 1,
                Bud: 1,
                Ukr: 1,
                Vie: 1,
                Gal: 1,
                War: 1,
                Rum: 1
            },
            type: "l",
            unit_center: {
                x: 377,
                y: 343
            },
            w_neighbors: {},
            path: "M333,330 L341,330 L344,332 L353,327 L356,323 L361,324 L367,329 L374,327 L379,324 L383,327 L385,332 L399,338 L404,354 L403,360 L404,371 L394,376 L384,365 L378,363 L377,360 L368,353 L360,351 L350,347 L337,350 L329,346 L322,347 L321,339 L322,347 L321,339 L325,340 L329,338Z"
        },
        Lon: {
            name: "London",
            center: {
                x: 160,
                y: 280
            },
            sc: {
                x: 156,
                y: 289
            },
            l_neighbors: {
                Wal: 1,
                Yor: 1
            },
            type: "l",
            unit_center: {
                x: 162,
                y: 281
            },
            w_neighbors: {
                NTH: 1,
                Wal: 1,
                Yor: 1,
                ENG: 1
            },
            path: "M166,269 L168,270 L171,268 L177,270 L178,274 L176,283 L165,293 L172,294 L168,296 L160,298 L147,295 L145,281 L150,277 L153,271Z"
        },
        Naf: {
            name: "North Africa",
            center: {
                x: 130,
                y: 536
            },
            l_neighbors: {
                Tun: 1
            },
            type: "l",
            unit_center: {
                x: 100,
                y: 536
            },
            w_neighbors: {
                Tun: 1,
                WES: 1,
                MAO: 1
            },
            path: "M203,520 L179,515 L169,518 L150,511 L117,509 L106,511 L99,515 L89,512 L84,518 L79,520 L68,516 L68,511 L64,514 L46,509 L42,502 L41,494 L37,495 L33,496 L17,518 L0,520 L0,559 L195,559 L197,527Z"
        },
        Rum: {
            name: "Rumania",
            center: {
                x: 410,
                y: 415
            },
            sc: {
                x: 402,
                y: 413
            },
            l_neighbors: {
                Ser: 1,
                Bul: 1,
                Sev: 1,
                Ukr: 1,
                Bud: 1,
                Gal: 1
            },
            type: "l",
            unit_center: {
                x: 415,
                y: 405
            },
            w_neighbors: {
                BLA: 1,
                Sev: 1,
                Bulec: 1
            },
            path: "M403,360 L404,371 L394,376 L395,382 L401,385 L406,396 L401,402 L387,402 L367,406 L365,412 L367,421 L370,425 L375,423 L382,427 L390,425 L398,427 L404,422 L410,420 L422,420 L430,423 L432,409 L439,404 L438,397 L427,399 L422,382 L423,376 L414,372 L411,361Z"
        },
        Boh: {
            name: "Bohemia",
            center: {
                x: 283,
                y: 347
            },
            l_neighbors: {
                Sil: 1,
                Tyr: 1,
                Mun: 1,
                Vie: 1,
                Gal: 1
            },
            type: "l",
            unit_center: {
                x: 289,
                y: 336
            },
            w_neighbors: {},
            path: "M281,356 L276,346 L268,343 L264,329 L266,325 L278,326 L288,321 L297,322 L311,334 L314,332 L321,339 L322,347 L316,348 L303,346 L295,349 L292,357Z"
        },
        HEL: {
            name: "Helgoland Bight",
            center: {
                x: 220,
                y: 265
            },
            l_neighbors: {
                Den: 1,
                Hol: 1,
                Kie: 1
            },
            type: "w",
            unit_center: {
                x: 226,
                y: 252
            },
            w_neighbors: {
                NTH: 1
            },
            path: "M245,237 L243,247 L244,254 L243,257 L245,263 L244,270 L244,273 L235,277 L234,274 L230,273 L226,275 L211,274 L211,237Z"
        },
        Sev: {
            name: "Sevastopol",
            center: {
                x: 540,
                y: 350
            },
            sc: {
                x: 479,
                y: 393
            },
            l_neighbors: {
                Ukr: 1,
                Mos: 1,
                Arm: 1,
                Rum: 1
            },
            type: "l",
            unit_center: {
                x: 515,
                y: 330
            },
            w_neighbors: {
                BLA: 1,
                Arm: 1,
                Rum: 1
            },
            path: "M438,397 L446,378 L459,375 L461,377 L459,379 L465,383 L476,381 L478,383 L472,385 L468,392 L477,396 L477,401 L486,404 L488,397 L494,396 L497,392 L507,389 L506,384 L494,387 L485,378 L503,364 L526,351 L527,354 L514,365 L517,371 L520,371 L515,384 L511,383 L510,386 L517,393 L528,394 L554,406 L567,408 L573,417 L570,427 L589,442 L594,439 L603,441 L609,440 L609,330 L597,330 L569,321 L564,305 L554,304 L549,284 L533,283 L526,287 L516,286 L505,280 L494,295 L477,289 L468,295 L470,303 L466,307 L460,345 L445,350 L434,360 L432,372 L423,376 L422,382 L427,399Z"
        },
        Edi: {
            name: "Edinburgh",
            center: {
                x: 152,
                y: 202
            },
            sc: {
                x: 154,
                y: 219
            },
            l_neighbors: {
                Cly: 1,
                Lvp: 1,
                Yor: 1
            },
            type: "l",
            unit_center: {
                x: 157,
                y: 210
            },
            w_neighbors: {
                NTH: 1,
                Cly: 1,
                Yor: 1,
                NWG: 1
            },
            path: "M152,194 L158,193 L171,197 L170,202 L165,210 L158,214 L151,215 L157,216 L161,218 L163,226 L155,228 L145,217 L144,213 L146,200Z"
        },
        Spa: {
            name: "Spain",
            coasts: {
                sc: {
                    x: 52,
                    y: 475,
                    path: "M134,417 L40,441 L34,447 L36,457 L27,468 L33,475 L34,484 L37,490 L47,488 L52,489 L60,486 L78,491 L83,494 L86,485 L90,483 L98,484 L107,474 L113,473 L115,469 L110,461 L124,444 L131,439 L146,438 L157,432 L158,425 L154,427 L142,417 L135,414Z"
                },
                nc: {
                    x: 80,
                    y: 404,
                    path: "M134,417 L123,412 L113,407 L112,399 L101,396 L96,397 L72,384 L59,381 L54,375 L48,374 L46,378 L39,375 L33,381 L35,384 L32,396 L43,395 L42,399 L55,400 L62,407 L61,411 L52,412 L42,432 L37,431 L40,441"
                }
            },
            center: {
                x: 85,
                y: 450
            },
            sc: {
                x: 80,
                y: 432
            },
            l_neighbors: {
                Gas: 1,
                Spa: 1,
                Mar: 1,
                Por: 1
            },
            type: "l",
            unit_center: {
                x: 64,
                y: 439
            },
            w_neighbors: {
                sc: {
                    LYO: 1,
                    MAO: 1,
                    WES: 1,
                    Por: 1,
                    Mar: 1
                },
                nc: {
                    Gas: 1,
                    MAO: 1,
                    Por: 1
                }
            },
            path: "M134,417 L123,412 L113,407 L112,399 L101,396 L96,397 L72,384 L59,381 L54,375 L48,374 L46,378 L39,375 L33,381 L35,384 L32,396 L43,395 L42,399 L55,400 L62,407 L61,411 L52,412 L42,432 L37,431 L40,441 L40,441 L34,447 L36,457 L27,468 L33,475 L34,484 L37,490 L47,488 L52,489 L60,486 L78,491 L83,494 L86,485 L90,483 L98,484 L107,474 L113,473 L115,469 L110,461 L124,444 L131,439 L146,438 L157,432 L158,425 L154,427 L142,417 L135,414Z"
        },
        Bul: {
            name: "Bulgaria",
            coasts: {
                sc: {
                    x: 399,
                    y: 462,
                    path: "M413,464 L412,454 L371,438 L366,439 L371,456 L365,461 L369,464 L376,464 L388,460 L392,472 L400,468 L408,470 L413,464 L412,454Z"
                },
                ec: {
                    x: 410,
                    y: 440,
                    path: "M412,454 L420,451 L426,450 L422,441 L425,427 L429,426 L430,423 L422,420 L410,420 L404,422 L398,427 L390,425 L382,427 L375,423 L370,425 L367,421 L365,425 L368,433 L371,438Z"
                }
            },
            center: {
                x: 395,
                y: 443
            },
            sc: {
                x: 377,
                y: 444
            },
            l_neighbors: {
                Ser: 1,
                Con: 1,
                Bul: 1,
                Gre: 1,
                Rum: 1
            },
            type: "l",
            unit_center: {
                x: 395,
                y: 443
            },
            w_neighbors: {
                sc: {
                    Con: 1,
                    AEG: 1,
                    Gre: 1
                },
                ec: {
                    BLA: 1,
                    Con: 1,
                    Rum: 1
                }
            },
            path: "M413,464 L412,454 L420,451 L426,450 L422,441 L425,427 L429,426 L430,423 L422,420 L410,420 L404,422 L398,427 L390,425 L382,427 L375,423 L370,425 L367,421 L365,425 L368,433 L371,438 L366,439 L371,456 L365,461 L369,464 L376,464 L388,460 L392,472 L400,468 L408,470 L413,464 L412,454Z"
        },
        IRI: {
            name: "Irish Sea",
            center: {
                x: 95,
                y: 270
            },
            l_neighbors: {
                Wal: 1,
                Lvp: 1
            },
            type: "w",
            unit_center: {
                x: 90,
                y: 276
            },
            w_neighbors: {
                MAO: 1,
                NAO: 1,
                ENG: 1
            },
            path: "M100,291 L112,287 L122,281 L130,282 L127,276 L119,272 L116,272 L115,265 L128,262 L126,256 L121,257 L132,250 L135,250 L139,240 L136,229 L130,227 L120,227 L110,232 L109,246 L98,259 L87,257 L70,261 L58,273 L88,303Z"
        },
        War: {
            name: "Warsaw",
            center: {
                x: 355,
                y: 304
            },
            sc: {
                x: 343,
                y: 302
            },
            l_neighbors: {
                Sil: 1,
                Lvn: 1,
                Ukr: 1,
                Mos: 1,
                Gal: 1,
                Pru: 1
            },
            type: "l",
            unit_center: {
                x: 361,
                y: 315
            },
            w_neighbors: {},
            path: "M333,330 L326,327 L323,322 L320,303 L324,299 L326,292 L341,287 L345,289 L359,286 L365,281 L372,283 L379,290 L386,309 L383,327 L379,324 L374,327 L367,329 L361,324 L356,323 L353,327 L344,332 L341,330Z"
        },
        BAR: {
            name: "Barents Sea",
            center: {
                x: 440,
                y: 15
            },
            l_neighbors: {
                Nwy: 1,
                Stpnc: 1
            },
            type: "w",
            unit_center: {
                x: 445,
                y: 41
            },
            w_neighbors: {
                NWG: 1
            },
            path: "M540,0 L535,9 L530,6 L517,19 L516,33 L513,38 L513,23 L507,20 L505,26 L499,33 L492,48 L495,58 L488,60 L479,57 L477,55 L481,50 L473,43 L466,45 L472,62 L478,66 L478,74 L472,72 L468,74 L457,91 L469,100 L467,106 L462,109 L444,101 L442,110 L447,115 L454,119 L452,122 L434,118 L426,103 L426,94 L414,88 L412,83 L445,84 L457,79 L459,66 L453,61 L417,47 L405,49 L401,45 L397,48 L391,47 L395,41 L394,38 L384,33 L382,40 L380,33 L377,31 L374,38 L371,33 L366,42 L366,33 L362,33 L362,0Z"
        },
        Vie: {
            name: "Vienna",
            center: {
                x: 307,
                y: 370
            },
            sc: {
                x: 298,
                y: 363
            },
            l_neighbors: {
                Tri: 1,
                Tyr: 1,
                Boh: 1,
                Bud: 1,
                Gal: 1
            },
            type: "l",
            unit_center: {
                x: 314,
                y: 360
            },
            w_neighbors: {},
            path: "M292,357 L295,349 L303,346 L316,348 L322,347 L329,346 L337,350 L335,354 L322,370 L311,375 L308,383 L299,385 L294,380 L295,362Z"
        },
        Apu: {
            name: "Apulia",
            center: {
                x: 291,
                y: 470
            },
            l_neighbors: {
                Rom: 1,
                Nap: 1,
                Ven: 1
            },
            type: "l",
            unit_center: {
                x: 302,
                y: 472
            },
            w_neighbors: {
                ADR: 1,
                Nap: 1,
                ION: 1,
                Ven: 1
            },
            path: "M304,484 L310,480 L318,485 L322,485 L322,480 L297,456 L300,453 L290,453 L278,443 L274,447 L279,451 L280,455 L279,458 L293,481Z"
        },
        Rom: {
            name: "Rome",
            center: {
                x: 262,
                y: 457
            },
            sc: {
                x: 268,
                y: 448
            },
            l_neighbors: {
                Apu: 1,
                Nap: 1,
                Tus: 1,
                Ven: 1
            },
            type: "l",
            unit_center: {
                x: 255,
                y: 445
            },
            w_neighbors: {
                TYS: 1,
                Tus: 1,
                Nap: 1
            },
            path: "M247,442 L248,447 L256,458 L271,464 L279,458 L280,455 L279,451 L274,447 L263,434 L250,438Z"
        },
        Tun: {
            name: "Tunis",
            center: {
                x: 210,
                y: 555
            },
            sc: {
                x: 220,
                y: 529
            },
            l_neighbors: {
                Naf: 1
            },
            type: "l",
            unit_center: {
                x: 212,
                y: 542
            },
            w_neighbors: {
                TYS: 1,
                WES: 1,
                ION: 1,
                Naf: 1
            },
            path: "M232,559 L234,551 L232,544 L225,535 L231,531 L236,524 L233,523 L224,527 L223,518 L218,516 L212,517 L208,521 L203,520 L197,527 L195,559Z"
        },
        Mos: {
            name: "Moscow",
            center: {
                x: 460,
                y: 265
            },
            sc: {
                x: 481,
                y: 234
            },
            l_neighbors: {
                Stp: 1,
                Sev: 1,
                Lvn: 1,
                Ukr: 1,
                War: 1
            },
            type: "l",
            unit_center: {
                x: 505,
                y: 226
            },
            w_neighbors: {},
            path: "M609,117 L598,132 L573,143 L564,159 L534,164 L515,169 L489,184 L476,183 L458,194 L456,207 L457,210 L451,213 L447,209 L439,211 L428,225 L421,229 L409,228 L405,239 L404,275 L392,278 L389,285 L379,290 L386,309 L390,306 L456,292 L468,295 L477,289 L494,295 L505,280 L516,286 L526,287 L533,283 L549,284 L554,304 L564,305 L569,321 L597,330 L609,330Z"
        },
        WES: {
            name: "Western Mediterranean",
            center: {
                x: 160,
                y: 491
            },
            l_neighbors: {
                Spasc: 1,
                Tun: 1,
                Naf: 1
            },
            type: "w",
            unit_center: {
                x: 140,
                y: 492
            },
            w_neighbors: {
                LYO: 1,
                TYS: 1,
                MAO: 1
            },
            path: "M37,490 L47,488 L52,489 L60,486 L78,491 L83,494 L86,485 L90,483 L98,484 L107,474 L113,473 L115,469 L142,469 L150,471 L154,466 L205,466 L206,476 L204,485 L208,492 L212,492 L217,489 L218,490 L218,516 L212,517 L208,521 L203,520 L179,515 L169,518 L150,511 L117,509 L106,511 L99,515 L89,512 L84,518 L79,520 L68,516 L68,511 L64,514 L46,509 L42,502 L41,494 L37,495Z"
        },
        Lvn: {
            name: "Livonia",
            center: {
                x: 380,
                y: 260
            },
            l_neighbors: {
                Stp: 1,
                Mos: 1,
                Pru: 1,
                War: 1
            },
            type: "l",
            unit_center: {
                x: 382,
                y: 245
            },
            w_neighbors: {
                Stpsc: 1,
                BAL: 1,
                BOT: 1,
                Pru: 1
            },
            path: "M369,202 L365,204 L368,210 L372,213 L373,221 L377,227 L373,229 L366,228 L359,220 L349,229 L347,243 L354,251 L356,261 L362,260 L367,265 L365,281 L372,283 L379,290 L389,285 L392,278 L404,275 L405,239 L409,228 L405,217 L394,205 L382,206 L372,205Z"
        },
        NTH: {
            name: "North Sea",
            center: {
                x: 190,
                y: 230
            },
            l_neighbors: {
                Lon: 1,
                Den: 1,
                Nwy: 1,
                Hol: 1,
                Yor: 1,
                Bel: 1,
                Edi: 1
            },
            type: "w",
            unit_center: {
                x: 204,
                y: 215
            },
            w_neighbors: {
                HEL: 1,
                ENG: 1,
                NWG: 1,
                SKA: 1
            },
            path: "M245,237 L248,224 L241,224 L241,209 L231,201 L229,192 L233,186 L231,180 L233,167 L237,160 L236,154 L198,154 L171,181 L171,197 L170,202 L165,210 L158,214 L151,215 L157,216 L161,218 L163,226 L163,239 L168,246 L170,252 L169,265 L166,269 L168,270 L171,268 L177,270 L178,274 L176,283 L165,293 L172,294 L168,296 L173,301 L191,299 L198,289 L205,276 L205,279 L207,279 L211,274 L211,237Z"
        },
        Alb: {
            name: "Albania",
            center: {
                x: 333,
                y: 460
            },
            l_neighbors: {
                Tri: 1,
                Ser: 1,
                Gre: 1
            },
            type: "l",
            unit_center: {
                x: 339,
                y: 469
            },
            w_neighbors: {
                Tri: 1,
                ADR: 1,
                Gre: 1,
                ION: 1
            },
            path: "M331,454 L331,477 L335,480 L339,487 L350,477 L350,471 L346,466 L346,452 L337,446 L330,445Z"
        },
        Syr: {
            name: "Syria",
            center: {
                x: 570,
                y: 535
            },
            l_neighbors: {
                Arm: 1,
                Smy: 1
            },
            type: "l",
            unit_center: {
                x: 570,
                y: 520
            },
            w_neighbors: {
                EAS: 1,
                Smy: 1
            },
            path: "M530,509 L536,494 L545,486 L555,484 L563,479 L584,478 L609,493 L609,559 L528,559 L532,535 L526,530 L525,518Z"
        },
        Gas: {
            name: "Gascony",
            center: {
                x: 130,
                y: 400
            },
            l_neighbors: {
                Par: 1,
                Spa: 1,
                Mar: 1,
                Bur: 1,
                Bre: 1
            },
            type: "l",
            unit_center: {
                x: 137,
                y: 388
            },
            w_neighbors: {
                MAO: 1,
                Spanc: 1,
                Bre: 1
            },
            path: "M128,363 L121,382 L122,384 L112,399 L113,407 L123,412 L134,417 L135,414 L142,417 L149,403 L157,397 L168,395 L163,387 L165,383 L158,380 L156,374 L149,372 L146,365Z"
        },
        Bre: {
            name: "Brest",
            center: {
                x: 130,
                y: 345
            },
            sc: {
                x: 106,
                y: 322
            },
            l_neighbors: {
                Par: 1,
                Gas: 1,
                Pic: 1
            },
            type: "l",
            unit_center: {
                x: 125,
                y: 334
            },
            w_neighbors: {
                Gas: 1,
                MAO: 1,
                ENG: 1,
                Pic: 1
            },
            path: "M150,319 L144,318 L142,312 L136,310 L136,326 L124,323 L122,318 L102,317 L100,322 L103,328 L109,329 L123,344 L122,350 L123,357 L128,363 L146,365 L146,337 L148,329Z"
        },
        Tyr: {
            name: "Tyrolia",
            center: {
                x: 255,
                y: 380
            },
            l_neighbors: {
                Tri: 1,
                Pie: 1,
                Boh: 1,
                Mun: 1,
                Vie: 1,
                Ven: 1
            },
            type: "l",
            unit_center: {
                x: 277,
                y: 378
            },
            w_neighbors: {},
            path: "M234,366 L243,370 L246,369 L250,371 L267,368 L271,370 L269,362 L275,362 L281,356 L292,357 L295,362 L294,380 L289,385 L276,386 L268,385 L259,388 L255,394 L250,397 L246,392 L243,388 L245,384 L241,378 L234,374Z"
        },
        Sil: {
            name: "Silesia",
            center: {
                x: 304,
                y: 325
            },
            l_neighbors: {
                Ber: 1,
                Boh: 1,
                Mun: 1,
                Gal: 1,
                Pru: 1,
                War: 1
            },
            type: "l",
            unit_center: {
                x: 304,
                y: 314
            },
            w_neighbors: {},
            path: "M288,321 L297,322 L311,334 L314,332 L321,339 L325,340 L329,338 L333,330 L326,327 L323,322 L320,303 L296,300 L288,305 L284,314Z"
        },
        EAS: {
            name: "Eastern Mediterranean",
            center: {
                x: 455,
                y: 550
            },
            l_neighbors: {
                Syr: 1,
                Smy: 1
            },
            type: "w",
            unit_center: {
                x: 474,
                y: 546
            },
            w_neighbors: {
                AEG: 1,
                ION: 1
            },
            path: "M435,530 L441,526 L447,528 L453,534 L464,531 L466,521 L475,520 L485,528 L491,530 L505,526 L511,514 L520,517 L527,508 L530,509 L525,518 L526,530 L532,535 L528,559 L400,559 L400,554 L414,552 L416,549Z"
        },
        Lvp: {
            name: "Liverpool",
            center: {
                x: 134,
                y: 226
            },
            sc: {
                x: 142,
                y: 253
            },
            l_neighbors: {
                Wal: 1,
                Cly: 1,
                Yor: 1,
                Edi: 1
            },
            type: "l",
            unit_center: {
                x: 142,
                y: 241
            },
            w_neighbors: {
                IRI: 1,
                Wal: 1,
                Cly: 1,
                NAO: 1
            },
            path: "M128,262 L126,256 L121,257 L132,250 L135,250 L139,240 L136,229 L130,227 L130,223 L138,217 L138,214 L144,213 L145,217 L155,228 L155,239 L151,248 L150,264 L143,262Z"
        },
        Por: {
            name: "Portugal",
            center: {
                x: 22,
                y: 440
            },
            sc: {
                x: 15,
                y: 434
            },
            l_neighbors: {
                Spa: 1
            },
            type: "l",
            unit_center: {
                x: 34,
                y: 417
            },
            w_neighbors: {
                Spasc: 1,
                MAO: 1,
                Spanc: 1
            },
            path: "M32,396 L30,406 L17,427 L14,427 L10,433 L13,440 L15,441 L12,450 L13,454 L8,462 L19,469 L27,468 L36,457 L34,447 L40,441 L37,431 L42,432 L52,412 L61,411 L62,407 L55,400 L42,399 L43,395Z"
        },
        BLA: {
            name: "Black Sea",
            center: {
                x: 500,
                y: 418
            },
            l_neighbors: {
                Con: 1,
                Sev: 1,
                Bulec: 1,
                Arm: 1,
                Ank: 1,
                Rum: 1
            },
            type: "w",
            unit_center: {
                x: 484,
                y: 420
            },
            w_neighbors: {
                AEG: 1
            },
            path: "M440,458 L430,455 L426,450 L422,441 L425,427 L429,426 L430,423 L432,409 L439,404 L438,397 L446,378 L459,375 L461,377 L459,379 L465,383 L476,381 L478,383 L472,385 L468,392 L477,396 L477,401 L486,404 L488,397 L494,396 L497,392 L507,389 L506,384 L494,387 L485,378 L503,364 L526,351 L527,354 L514,365 L517,371 L520,371 L515,384 L511,383 L510,386 L517,393 L528,394 L554,406 L567,408 L573,417 L570,427 L555,438 L551,437 L520,441 L514,438 L511,440 L502,433 L481,438 L470,447 L464,457 L442,460Z"
        },
        AEG: {
            name: "Aegean Sea",
            center: {
                x: 392,
                y: 510
            },
            l_neighbors: {
                Con: 1,
                Bulsc: 1,
                Gre: 1,
                Smy: 1
            },
            type: "w",
            unit_center: {
                x: 403,
                y: 524
            },
            w_neighbors: {
                EAS: 1,
                BLA: 1,
                ION: 1
            },
            path: "M376,537 L371,520 L378,521 L377,513 L386,516 L385,509 L370,494 L371,491 L378,494 L368,483 L371,477 L379,484 L382,483 L381,477 L386,478 L380,472 L392,472 L400,468 L408,470 L410,473 L414,475 L410,482 L409,487 L417,486 L417,489 L420,495 L417,498 L417,507 L423,510 L427,524 L435,523 L435,530 L416,549 L412,547 L387,546 L383,544Z"
        },
        Nwy: {
            name: "Norway",
            center: {
                x: 250,
                y: 175
            },
            sc: {
                x: 270,
                y: 187
            },
            l_neighbors: {
                Fin: 1,
                Swe: 1,
                Stp: 1
            },
            type: "l",
            unit_center: {
                x: 264,
                y: 160
            },
            w_neighbors: {
                Swe: 1,
                NTH: 1,
                Stpnc: 1,
                NWG: 1,
                BAR: 1,
                SKA: 1
            },
            path: "M397,48 L391,47 L395,41 L394,38 L384,33 L382,40 L380,33 L377,31 L374,38 L371,33 L366,42 L366,33 L362,33 L357,39 L343,44 L324,54 L320,64 L310,75 L309,84 L303,86 L292,111 L277,132 L269,134 L264,142 L258,141 L236,154 L237,160 L233,167 L231,180 L233,186 L229,192 L231,201 L241,209 L246,210 L266,201 L270,193 L275,203 L279,204 L287,177 L285,170 L290,164 L292,133 L301,132 L300,126 L309,115 L308,104 L311,101 L324,71 L332,74 L330,64 L341,65 L342,61 L346,54 L355,62 L369,61 L370,49 L379,48 L388,54 L386,58 L388,61Z"
        },
        Bur: {
            name: "Burgundy",
            center: {
                x: 185,
                y: 371
            },
            l_neighbors: {
                Par: 1,
                Gas: 1,
                Ruh: 1,
                Mun: 1,
                Mar: 1,
                Bel: 1,
                Pic: 1
            },
            type: "l",
            unit_center: {
                x: 191,
                y: 360
            },
            w_neighbors: {},
            path: "M192,323 L205,331 L204,338 L211,346 L213,352 L209,363 L208,367 L194,382 L178,381 L178,390 L173,396 L168,395 L163,387 L165,383 L158,380 L156,374 L165,365 L185,344 L188,332Z"
        }
    }
}
;
function activateTab(a) {
    (a = document.querySelector('#game-tabs a[href="' + a + '"]')) && (new bootstrap.Tab(a)).show()
}
function updateHash(a) {
    history.pushState ? window.location.hash !== a && history.pushState(null, null, a) : window.location.hash !== a && (window.location.hash = a)
}
function clearPressHash() {
    history.replaceState ? history.replaceState(null, null, "#press") : location.hash = "#press"
}
function loadPressMessage(a) {
    var e = document.querySelector('#game-tabs a[href="#press"]');
    e && !e.classList.contains("active") && activateTab("#press");
    updateHash("#" + a);
    "function" === typeof loadPressMessageContent && loadPressMessageContent(a)
}
$(function() {
    function a() {
        $("#unsubmitted-orders-alert").remove();
        $("#unsubmitted-orders-alert-icon").addClass("d-none");
        setTimeout(function() {
            $("#submit_orders_button > i").replaceWith('<i class="fas fa-chevron-circle-right"></i>')
        }, 2E3)
    }
    new tilegames.Game(stage,orders,unitsByPlayer,territories,activePlayer,unitChangeCount,buildableTerritories,unbuildableTerritories,retreatOptions,playerRetreatOrders,disable_engine);
    if ("game" === gameType) {
        var e = function() {
            var a = base_url.match(/.*\/(\d+)$/)[1];
            fetch("/api/game/" + a + "?gapi_p1=" + gapi_p1).then(function(a) {
                return a.text()
            }).then(function(a) {
                "0" === a && (document.getElementById("adjudication-info").innerHTML = '<div class="alert alert-warning text-center" role="alert">The game has updated. <a href="javascript:history.go(0)">Please click to reload the page.</a></div>')
            })
        }
          , h = function(a) {
            var c = $jscomp.makeIterator(a);
            c.next();
            a = c.next().value;
            var d = c.next().value
              , e = c.next().value;
            c = c.next().value;
            0 < a ? message = a + " days, " + d + " hours" : 0 < d ? message = d + " hours, " + e + " minutes" : 5 < e ? message = e + " minutes" : 0 < e ? message = e + " minutes, " + c + " seconds" : 0 < c && (message = c + " seconds");
            document.querySelectorAll(".time-remaining-string").forEach(function(a) {
                return a.innerHTML = "Next adjudication in " + message
            })
        }
          , f = function() {
            var a = nextAdjudicationTime - Math.floor(Date.now() / 1E3);
            daysLeft = Math.floor(a / 86400);
            hoursLeft = Math.floor(a % 86400 / 3600);
            minutesLeft = Math.floor(a % 3600 / 60);
            secondsLeft = Math.floor(a % 60);
            return [a, daysLeft, hoursLeft, minutesLeft, secondsLeft]
        }
          , d = function() {
            if (document.getElementsByClassName("time-remaining-string")) {
                var a = f();
                0 < a[0] ? (h(a),
                0 < a[1] || 0 < a[2] || 5 < a[3] ? setTimeout(d, 6E4) : setTimeout(d, 1E3)) : document.querySelectorAll(".time-remaining-string").forEach(function(a) {
                    return a.innerHTML = "PENDING ADJUDICATION!"
                })
            }
        };
        nextAdjudicationTime && d();
        gapi_p1 && setInterval(e, 6E4);
        $("#info-tab").one("show.bs.tab", function(a) {
            $.ajax({
                type: "GET",
                url: base_url + "/ajax/info",
                traditional: !0,
                success: function(a) {
                    $("#info").html(a)
                },
                complete: function(a, c) {},
                error: function(a, c, d) {}
            })
        });
        $("#btn_adjudicate_now").click(function(a) {
            a = $(a.target).data("fullstage");
            confirm("This will immediately process adjudication for " + a + ". Adjudicate now?") && $("form#adjudicate_now").submit()
        });
        $("#gamemasterModal").one("shown.bs.modal", function() {
            initialize_datatables("table#player-list", !1)
        });
        document.querySelector("#orders_prompt") && document.querySelector("#orders_prompt").addEventListener("submit", function(c) {
            c.preventDefault();
            c = $(this).attr("action");
            c += "-api";
            var d = $(this).serialize();
            $("#submit_orders_button").prop("disabled", !0);
            $("#submit_orders_button > i").replaceWith('<i class="fa fa-spinner fa-spin"></i>');
            $.ajax({
                url: c,
                type: "post",
                data: d,
                success: function(a) {
                    $("#submit_orders_button > i").replaceWith('<i class="fas fa-check-circle text-success"></i>')
                },
                error: function(a) {
                    $("#submit_orders_button > i").replaceWith('<i class="fas fa-exclamation-circle text-danger"></i>');
                    $("#alert").prepend('<div class="alert alert-danger" role="alert">An error occurred. Please refresh the page.</div>')
                },
                complete: function() {
                    a()
                }
            });
            window.ga && ga("send", "event", gameType, "submit_orders")
        })
    }
    $('#game-tabs a[data-bs-toggle="tab"]').on("shown.bs.tab", function(a) {
        a = a.target.getAttribute("href");
        var c = window.location.hash;
        "#press" === a && 1 < c.length && !isNaN(c.substring(1)) || a && a.startsWith("#") && updateHash(a)
    });
    $(document).ready(function() {
        var a = window.location.hash;
        a && (1 < a.length && !isNaN(a.substring(1)) ? (a = a.substring(1),
        loadPressMessage(a)) : activateTab(a))
    });
    $(document).on("click", "#back-to-press-from-compose, #back-to-press-from-threads", function(a) {
        clearPressHash()
    });
    $("#press-tab").on("click", function(a) {
        if ($("#press-threads").hasClass("show"))
            return $("#press-threads").collapse("hide"),
            $("#press-listings").collapse("show"),
            clearPressHash(),
            !1;
        if ($("#press-compose-new").hasClass("show"))
            return $("#press-compose-new").collapse("hide"),
            $("#press-listings").collapse("show"),
            clearPressHash(),
            !1
    })
});
tilegames = tilegames || {};
tilegames.Game = function(a, e, h, f, d, c, x, z, E, N, F) {
    this.events_ = {};
    this.map_ = new tilegames.Map({
        x: 560,
        y: 610
    },1);
    this.gamestate_ = new tilegames.GameState(a,e,h,f,c,x,z,E,N);
    this.disableEngine_ = F;
    this.unsavedChanges_ = !1;
    this.mapRenderer_ = new MapRenderer(this.events_,this.map_);
    this.textRenderer_ = new TextRenderer(this.events_,this.map_,this.disableEngine_,d,isGM,gameType,f);
    this.toolTipRenderer_ = new ToolTipRenderer(this.events_,this.map_);
    this.disableEngine_ || (this.mapEventHandler = new MapEventHandler(this.events_,this.map_,this.mapRenderer_.getMapShapes()),
    this.keyboardEventHandler = new KeyboardEventHandler(this.events_),
    this.textEventHandler = new TextEventHandler(this.events_));
    this.orderEventHandler = new tilegames.OrderEventHandler(this.events_,this.gamestate_,this.map_,d);
    this.sandboxEditEventHandler = new SandboxEditEventHandler(this.events_,this.gamestate_,this.map_)
}
;
function copyToClipboard(a, e) {
    a = document.getElementById(a).value;
    navigator.clipboard.writeText(a).then(function() {
        document.getElementById(e).classList.add("animate");
        setTimeout(function() {
            document.getElementById(e).classList.remove("animate")
        }, 1E3)
    }, function(a) {
        console.error("Async: Could not copy text: ", a)
    })
}
;tilegames = tilegames || {};
tilegames.GameState = function(a, e, h, f, d, c, x, z, E) {
    this.stage_ = a;
    this.orders_ = e;
    this.unitsByPlayer_ = h;
    this.territories_ = f;
    this.unitChangeCount_ = d;
    this.buildableTerritories_ = c;
    this.unbuildableTerritories_ = x;
    this.retreatOptions_ = z;
    this.playerRetreatOrders_ = E
}
;
tilegames.GameState.prototype.getSupplyCenterCountByCountry = function(a) {
    for (var e = 0, h = $jscomp.makeIterator(Object.entries(this.territories_)), f = h.next(); !f.done; f = h.next())
        f = $jscomp.makeIterator(f.value),
        f.next(),
        f.next().value === a && e++;
    return e
}
;
tilegames.GameState.prototype.getUnitByTerritory = function(a) {
    for (var e in this.unitsByPlayer_) {
        var h = this.unitsByPlayer_[e], f;
        for (f in h)
            if (a == f)
                return {
                    type: h[f],
                    owner: e
                }
    }
    return null
}
;
tilegames.GameState.prototype.buildableTerritories = function() {
    return this.buildableTerritories_
}
;
tilegames.GameState.prototype.unbuildableTerritories = function() {
    return this.unbuildableTerritories_
}
;
tilegames.GameState.prototype.orders = function() {
    return this.orders_
}
;
tilegames.GameState.prototype.playerAt = function(a) {
    return a && (a = this.getUnitByTerritory(a)) ? a.owner : null
}
;
tilegames.GameState.prototype.playerUnits = function(a) {
    return this.unitsByPlayer_[a]
}
;
tilegames.GameState.prototype.retreatOptions = function(a) {
    var e = this.playerAt(a);
    if (e && this.retreatOptions_[e])
        return this.retreatOptions_[e][a]
}
;
tilegames.GameState.prototype.stage = function() {
    return this.stage_
}
;
tilegames.GameState.prototype.territoryOwnedBy = function(a) {
    return this.territories_[a]
}
;
tilegames.GameState.prototype.unitsByPlayer = function() {
    return this.unitsByPlayer_
}
;
tilegames.GameState.prototype.unitChangeCount = function() {
    return this.unitChangeCount_
}
;
tilegames.GameState.prototype.unitTypeAt = function(a) {
    return a && (a = this.getUnitByTerritory(a)) ? a.type : null
}
;
tilegames.GameState.prototype.updateUnitsByPlayer = function(a, e, h) {
    this.unitsByPlayer_[a][e] = h
}
;
tilegames.GameState.prototype.deleteUnitsByPlayer = function(a, e) {
    delete this.unitsByPlayer_[a][e]
}
;
tilegames.GameState.prototype.deleteOrder = function(a, e) {
    a in this.orders_ && e in this.orders_[a] && delete this.orders_[a][e]
}
;
tilegames.GameState.prototype.deleteTerritory = function(a) {
    delete this.territories_[a]
}
;
var MapRenderer = function(a, e) {
    function h(a, c) {
        u[a] = {};
        c.coasts ? $.each(c.coasts, function(c, d) {
            u[a][c] = C.path(d.path).attr(e.renderAttrs.shape).scaleToCanvas()
        }) : u[a].all = C.path(c.path).attr(e.renderAttrs.shape).scaleToCanvas()
    }
    function f(a, c) {
        e.scale >= e.MIN_SCALE_FOR_LABELS && (K[a] = C.text((c.center.x + 6) * e.scale, c.center.y * e.scale, a).attr(e.renderAttrs.text).scaleToCanvas(),
        c.coasts && (K[a] = {},
        $.each(c.coasts, function(c, d) {
            K[a][c] = C.text((d.x + 6) * e.scale, d.y * e.scale, c).attr(e.renderAttrs.text).scaleToCanvas()
        })))
    }
    function d(a, c) {
        var d = $("#country_colors ." + a).css("color");
        $.each(c, function(a, c) {
            var e = G(a, c);
            "A" == c ? map_unit = C.circle(e.x, e.y, 6).attr({
                "fill-opacity": .6,
                "stroke-width": 2,
                stroke: d,
                fill: d
            }).scaleToCanvas() : (c = e.x,
            e = e.y,
            map_unit = C.path(["M", c - 6, ",", e - 2, " L", c + 6, ",", e - 2, " L", c, ",", e + 5, "Z"]).attr({
                "fill-opacity": .6,
                "stroke-width": 2,
                stroke: d,
                fill: d
            }).scaleToCanvas());
            map_unit.node.id = "map_unit_" + a
        });
        T()
    }
    function c(a, c, d) {
        var e = Math.atan2(c.y - a.y, c.x - a.x)
          , f = c.x - 10 * Math.cos(e)
          , h = c.y - 10 * Math.sin(e)
          , p = c.x - 22 * Math.cos(e + .2)
          , M = c.y - 22 * Math.sin(e + .2)
          , y = c.x - 22 * Math.cos(e - .2);
        c = c.y - 22 * Math.sin(e - .2);
        e = ["M", a.x + 10 * Math.cos(e), ",", a.y + 10 * Math.sin(e), "L", f, ",", h].join("");
        a = C.set();
        a.push(C.path(e).attr({
            "stroke-width": "2",
            stroke: d
        }).scaleToCanvas());
        f = ["M", f, ",", h, "L", p, ",", M, "L", y, ",", c, "Z"].join("");
        a.push(C.path(f).attr({
            fill: d,
            "stroke-width": "2",
            "fill-opacity": "0.8",
            stroke: d
        }).scaleToCanvas());
        return a
    }
    function x(a, c) {
        c = C.set();
        var d = ["M", a.x - 8, ",", a.y - 8, "L", a.x + 8, ",", a.y + 8].join("");
        c.push(C.path(d).attr({
            "stroke-width": "2",
            stroke: "#f00"
        }).scaleToCanvas());
        a = ["M", a.x - 8, ",", a.y + 8, "L", a.x + 8, ",", a.y - 8].join("");
        c.push(C.path(a).attr({
            "stroke-width": "2",
            stroke: "#f00"
        }).scaleToCanvas());
        return c
    }
    function z(a, c) {
        e.territories[a].coasts ? $.each(u[a], function(a, d) {
            c && c != a || d.highlight()
        }) : u[a].all.highlight()
    }
    function E(a) {
        e.territories[a].coasts ? $.each(u[a], function(a, c) {
            c.unhighlight()
        }) : u[a].all.unhighlight()
    }
    function N(a) {
        a in e.territories && $.each(u[a], function(a, c) {
            c.attr(e.renderAttrs.selected_shape)
        })
    }
    function F(a) {
        a in e.territories && $.each(u[a], function(a, c) {
            c.attr(e.renderAttrs.selected_shape_secondary)
        })
    }
    function G(a, c) {
        if (!c)
            return null;
        if ("A" == c || "F" == c)
            return e.territories[a].unit_center;
        a = e.territories[a].coasts[c.coast];
        return {
            x: a.x + 6,
            y: a.y + 8
        }
    }
    function y(a, c) {
        return c ? e.territories[a].coasts[c] : e.territories[a].unit_center
    }
    function T() {
        $.each(u, function(a, c) {
            $.each(c, function(a, c) {
                c.toFront()
            })
        })
    }
    var K = {}
      , u = {}
      , p = {}
      , U = {}
      , ca = "London;Liverpool;Edinburgh;Trieste;Budapest;Vienna;Constantinople;Ankara;Smyrna;Rome;Naples;Venice;Paris;Marseilles;Brest;Sevastopol;St Petersburg;Moscow;Warsaw;Berlin;Munich;Kiel".split(";");
    Raphael.el.flash = function() {
        this.attr({
            "fill-opacity": .5
        });
        this.animate({
            "fill-opacity": 0
        }, 50);
        return this
    }
    ;
    Raphael.el.highlight = function() {
        this.attr({
            "fill-opacity": .1
        });
        return this
    }
    ;
    Raphael.el.unhighlight = function() {
        this.attr(e.renderAttrs.shape);
        return this
    }
    ;
    Raphael.el.scaleToCanvas = function() {
        this.scale(e.scale, e.scale, 0, 0);
        return this
    }
    ;
    Raphael.fn.star = function(a, c, d) {
        for (var e = "M" + a + "," + (c - d), f = 0; 6 > f; f += 1) {
            var h = 270 + 144 * f;
            e += "L" + (a + d * Math.cos(h * Math.PI / 180)) + "," + (c + d * Math.sin(h * Math.PI / 180))
        }
        return this.path(e)
    }
    ;
    var C = Raphael("map", e.canvasSize.x * e.scale, e.canvasSize.y * e.scale);
    C.setViewBox(0, 0, e.canvasSize.y, e.canvasSize.x);
    C.setSize("99%", "100%");
    C.image("/images/map_background.png", -1, -1, 610, 560).scaleToCanvas();
    $.each(e.territories, function(a, c) {
        c.fill = C.path(c.path).attr(e.renderAttrs[c.type]).scaleToCanvas();
        c.fill.node.id = "ter_" + a
    });
    $.each(e.territories, function(a, c) {
        f(a, c);
        h(a, c)
    });
    $(a).bind("DRAW_UNIT", function(a, c) {
        d(c.player, c.units)
    });
    $(a).bind("DRAW_TERRITORY", function(a, c) {
        a = c.terName;
        if (e.territories[a].sc) {
            var d = e.territories[a];
            c = c.player;
            var f = "#fff";
            c && (f = $("." + c).css("color"));
            ca.includes(d.name) ? C.rect(d.sc.x, d.sc.y, 6, 6, 0).attr({
                fill: f,
                "stroke-width": 1
            }).scaleToCanvas() : C.circle(d.sc.x, d.sc.y, 3).attr({
                fill: f,
                "stroke-width": 1
            }).scaleToCanvas();
            want_shaded_territories && ($("#ter_" + a).attr("fill", f),
            $("#ter_" + a).attr("style", "-webkit-tap-highlight-color: rgba(0, 0, 0, 0); fill-opacity: 0.3;"))
        }
    });
    $(a).bind("DRAW_ORDER", function(a, d) {
        a: {
            a = d.terName;
            var e = d.order;
            d = d.fullOrder;
            p[a] && p[a].remove();
            if (e) {
                color = "SUCCEEDS" == e.result ? "#000" : "FAILS" == e.result ? "#f00" : "#000";
                switch (e.type) {
                case "HOLD":
                    var f = G(d.unitTerritory, d.type);
                    if (!f)
                        break a;
                    p[a] = C.circle(f.x, f.y, 10).attr({
                        "stroke-width": 2,
                        stroke: color
                    }).scaleToCanvas();
                    break;
                case "MOVE":
                    f = G(d.unitTerritory, d.type);
                    if (!f)
                        break a;
                    p[a] = c(f, y(e.to, e.to_coast), color);
                    break;
                case "SUPPORT":
                    f = G(d.unitTerritory, d.type);
                    if (e.to) {
                        var h = f
                          , u = G(d.supportedUnitTerritory, d.supportedType)
                          , K = y(e.to, e.to_coast);
                        var n = color;
                        if (u && K && h) {
                            var M = (u.x + K.x) / 2
                              , F = (u.y + K.y) / 2
                              , b = (3 * u.x + K.x) / 4
                              , k = (3 * u.y + K.y) / 4
                              , l = (u.x + 3 * K.x) / 4;
                            f = (u.y + 3 * K.y) / 4;
                            if (K.x > u.x) {
                                var q = .05 * (K.y - u.y);
                                u = .05 * (u.x - K.x)
                            } else
                                q = .05 * (u.y - K.y),
                                u = .05 * (K.x - u.x);
                            h = ["M", h.x, ",", h.y, "C", M, ",", F, " ", b + q, ",", k + u, " ", l, ",", f].join("");
                            M = C.set();
                            M.push(C.path(h).attr({
                                "stroke-dasharray": ".",
                                "stroke-width": "2",
                                stroke: n
                            }).scaleToCanvas());
                            M.push(C.circle(l, f, 5).attr({
                                stroke: n
                            }).scaleToCanvas());
                            n = M
                        } else
                            n = void 0;
                        p[a] = n
                    } else
                        l = G(d.supportedUnitTerritory, d.supportedType),
                        n = color,
                        h = Math.atan2(l.y - f.y, l.x - f.x),
                        l = ["M", f.x + 10 * Math.cos(h), ",", f.y + 10 * Math.sin(h), "L", l.x - 10 * Math.cos(h), ",", l.y - 10 * Math.sin(h)].join(""),
                        f = C.set(),
                        f.push(C.path(l).attr({
                            "stroke-dasharray": ".",
                            "stroke-width": "2",
                            stroke: n
                        }).scaleToCanvas()),
                        p[a] = f;
                    break;
                case "CONVOY":
                    f = G(d.unitTerritory, d.type);
                    if (!f)
                        break a;
                    n = color;
                    l = ["M", f.x - 12, ",", f.y - 6, "L", f.x - 9, ",", f.y - 9, "L", f.x - 6, ",", f.y - 6, "L", f.x - 3, ",", f.y - 9, "L", f.x, ",", f.y - 6, "L", f.x + 3, ",", f.y - 9, "L", f.x + 6, ",", f.y - 6, "L", f.x + 9, ",", f.y - 9, "L", f.x + 12, ",", f.y - 6].join("");
                    f = C.set();
                    f.push(C.path(l).attr({
                        "stroke-width": "2",
                        stroke: n
                    }).scaleToCanvas());
                    p[a] = f;
                    break;
                case "BUILD":
                    if ("A" == e.unit_type || "F" == e.unit_type)
                        n = y(a, e.coast),
                        l = color,
                        f = e.unit_type,
                        "A" == f ? n = C.circle(n.x, n.y, 6).attr({
                            "fill-opacity": 0,
                            "stroke-width": 1.5,
                            "stroke-dasharray": ".",
                            stroke: l
                        }).scaleToCanvas() : "F" == f ? (n = ["M", n.x - 6, ",", n.y - 2, " L", n.x + 6, ",", n.y - 2, " L", n.x, ",", n.y + 5, "Z"],
                        n = C.path(n).attr({
                            "fill-opacity": 0,
                            "stroke-width": 1.5,
                            "stroke-dasharray": ".",
                            stroke: l
                        }).scaleToCanvas()) : n = void 0,
                        p[a] = n;
                    break;
                case "DISBAND":
                    f = G(d.unitTerritory, d.type);
                    if (!f)
                        break a;
                    p[a] = x(f, color)
                }
                e.retreat && (U[a] && (U[a].remove(),
                U[a] = null),
                e.retreat.to ? U[a] = c(G(a, d.type), y(e.retreat.to, e.retreat.to_coast), "#ffa500") : (e = G(a, d.type),
                U[a] = x(e, "#ffa500")));
                T()
            }
        }
    });
    $(a).bind("HIGHLIGHT_TERRITORY", function(a, c) {
        z(c.territory.name, c.coast)
    });
    $(a).bind("FADE_TERRITORY", function(a, c) {
        E(c.terName)
    });
    $(a).bind("HIGHLIGHT_PRIMARY_TERRITORY", function(a, c) {
        N(c.terName)
    });
    $(a).bind("HIGHLIGHT_SECONDARY_TERRITORY", function(a, c) {
        F(c.terName)
    });
    return {
        getMapShapes: function() {
            return u
        }
    }
};
var MapEventHandler = function(a, e, h) {
    function f(c, e) {
        $.each(c, function(c, f) {
            "createTouch"in document || (f.mouseover(function() {
                d != e && ($(a).trigger("MOUSEOVER_TERRITORY", {
                    terName: e,
                    coast: c
                }),
                d = e)
            }),
            f.mouseout(function() {
                d && $(a).trigger("MOUSEOUT_TERRITORY", {
                    terName: e,
                    coast: c
                });
                $("#status").html("&nbsp;");
                d = null
            }));
            f.click(function() {
                $(a).trigger("CLICK_TERRITORY", {
                    terName: e,
                    coast: c
                })
            })
        })
    }
    var d = null;
    (function() {
        $("#order_buttons").on("click", "button", function() {
            $(a).trigger("SET_STATE", {
                state: this.id.replace("order_button_", "").toUpperCase()
            })
        })
    }
    )();
    (function() {
        $.each(e.territories, function(a, d) {
            f(h[a], a)
        })
    }
    )()
};
var KeyboardEventHandler = function(a) {
    $(document).keyup(function(e) {
        if (32 == e.which || 65 <= e.which && 90 >= e.which || 27 == e.keyCode || 97 <= e.which && 122 >= e.which) {
            var h = String.fromCharCode(e.which).toLowerCase();
            "s" == h ? $(a).trigger("SET_STATE", {
                state: "SUPPORT"
            }) : "c" == h ? $(a).trigger("SET_STATE", {
                state: "CONVOY"
            }) : "h" == h ? $(a).trigger("SET_STATE", {
                state: "HOLD"
            }) : "m" == h ? $(a).trigger("SET_STATE", {
                state: "MOVE"
            }) : e.keyCode == KEYCODE_ESC && $(a).trigger("SET_STATE", {
                state: ""
            })
        }
    });
    KEYCODE_ESC = 27
};
var TextEventHandler = function(a) {
    function e(d) {
        d = $(this).attr("name");
        var c = null
          , e = $(this).attr("value");
        if ("sc" == e || "nc" == e)
            c = e,
            e = "F";
        $(a).trigger("CLICK_TERRITORY", {
            terName: d,
            coast: c,
            unitType: e
        })
    }
    function h(d) {
        d = $(this).attr("name");
        var c = $(this).attr("value");
        $(a).trigger("CLICK_TERRITORY", {
            terName: d,
            unitType: c
        })
    }
    function f(d) {
        d = $(this).attr("territory");
        var c = $(this).val();
        $(a).trigger("SET_RETREAT", {
            terName: d,
            retreatTo: c
        })
    }
    (function() {
        $().ready(function() {
            $(".builds_table").on("click", "input", e);
            $(".disbands_table").on("click", "input", h);
            $("#orders-text").on("change", "select", f)
        })
    }
    )()
};
var SandboxEditEventHandler = function(a, e, h) {
    function f() {
        $().ready(function() {
            $(".remove_unit").on("click", c);
            $(".remove_supply_center").on("click", E);
            $(".add_army").on("click", z);
            $(".add_fleet").on("click", z);
            $(".add_territory").on("click", z);
            $("#edit-submit").on("click", G)
        })
    }
    function d() {
        $("#edit-submit").prop("disabled", !1);
        $(".btn").removeClass("active");
        $(a).unbind("EDITING_STATE");
        self.sandbox_editing_state = "OFF"
    }
    function c(a) {
        x($(this).attr("ter"), $(this).attr("country"));
        F()
    }
    function x(c, d) {
        e.deleteUnitsByPlayer(d, c);
        e.deleteOrder(d, c);
        $("#map_unit_" + c).remove();
        $("#edit-submit").prop("disabled", !1);
        $(a).trigger("DRAW_ORDER", {
            terName: c,
            fullOrder: ""
        })
    }
    function z(c) {
        if ($(this).hasClass("active"))
            d();
        else {
            "OFF" != this._sandbox_editing_state && d();
            var f = $(this).attr("country");
            $(this).addClass("active");
            $(this).hasClass("add_army") ? (this._sandbox_editing_state = "WAITING_ARMY",
            $(a).bind("EDITING_STATE", function(c, u) {
                c = u.terName;
                u = d;
                if ("w" != h.territories[c].type) {
                    e.getUnitByTerritory(c) && x(c, e.getUnitByTerritory(c).owner);
                    e.updateUnitsByPlayer(f, c, "A");
                    var p = {};
                    $(a).trigger("DRAW_UNIT", {
                        player: f,
                        units: (p[c] = "A",
                        p)
                    });
                    F();
                    u()
                }
            })) : $(this).hasClass("add_fleet") ? (this._sandbox_editing_state = "WAITING_FLEET",
            $(a).bind("EDITING_STATE", function(c, u) {
                c = u.terName;
                var p = u.coast;
                u = d;
                0 !== Object.keys(h.territories[c].w_neighbors).length && (e.getUnitByTerritory(c) && x(c, e.getUnitByTerritory(c).owner),
                terDetails = "all" == p ? "F" : {
                    type: "F",
                    coast: p
                },
                e.updateUnitsByPlayer(f, c, terDetails),
                p = {},
                $(a).trigger("DRAW_UNIT", {
                    player: f,
                    units: (p[c] = terDetails,
                    p)
                }),
                F(),
                u())
            })) : $(this).hasClass("add_territory") && (this._sandbox_editing_state = "WAITING_SC",
            $(a).bind("EDITING_STATE", function(c, u) {
                c = u.terName;
                u = d;
                "sc"in h.territories[c] && (e.territories_[c] = f,
                $(a).trigger("DRAW_TERRITORY", {
                    terName: c,
                    player: f
                }),
                N(f),
                F(),
                u())
            }))
        }
    }
    function E(c) {
        c = $(this).attr("ter");
        var d = e.territories_[c];
        e.deleteTerritory(c);
        $(a).trigger("DRAW_TERRITORY", {
            terName: c
        });
        $("#edit-submit").prop("disabled", !1);
        N(d);
        F()
    }
    function N(a) {
        $("#" + a + "_sc_count").text(" " + a + " " + e.getSupplyCenterCountByCountry(a))
    }
    function F() {
        $("#orders-text").empty();
        $("#edit-text").empty();
        unitsByPlayer = e.unitsByPlayer();
        for (var c in unitsByPlayer)
            $(a).trigger("DRAW_UNIT_TEXT", {
                player: c,
                units: unitsByPlayer[c]
            });
        f()
    }
    function G(a) {
        a = $("#edit-submit-form");
        units_input = $("<input>").attr({
            type: "hidden",
            name: "units",
            value: JSON.stringify(e.unitsByPlayer())
        });
        territories_input = $("<input>").attr({
            type: "hidden",
            name: "territories",
            value: JSON.stringify(e.territories_)
        });
        a.append(units_input);
        a.append(territories_input);
        a.submit()
    }
    f();
    this._sandbox_editing_state = "OFF"
};
tilegames = tilegames || {};
tilegames.OrderEventHandler = function(a, e, h, f) {
    this.WAITING = 0;
    this.SELECTED = 1;
    this.SUPPORT = 2;
    this.CONVOY = 3;
    this.events_ = a;
    this.gamestate_ = e;
    this.map_ = h;
    this.activePlayer_ = f;
    this.orders_ = {};
    this.state_ = this.WAITING;
    this.target_ = this.selected_ = null;
    this.unsavedChanges_ = !1;
    this.initialize()
}
;
tilegames.OrderEventHandler.prototype.initialize = function() {
    this.orders_ = this.gamestate_.orders();
    for (var a in this.map_.territories) {
        var e = this.gamestate_.territoryOwnedBy(a);
        $(this.events_).trigger("DRAW_TERRITORY", {
            terName: a,
            player: e
        })
    }
    var h = this.gamestate_.unitsByPlayer()
      , f = this.gamestate_.orders();
    for (e in h)
        if ($(this.events_).trigger("DRAW_UNIT", {
            player: e,
            units: h[e]
        }),
        "NEEDS_BUILDS" !== this.gamestate_.stage() && (!this.activePlayer_ || this.activePlayer_ == e || "SATISFIED" === this.gamestate_.stage() || "NEEDS_RETREATS" === this.gamestate_.stage())) {
            var d = h[e];
            if ("SATISFIED" === this.gamestate_.stage()) {
                var c = f[e];
                for (a in c) {
                    var x = c[a];
                    if ("BUILD" === x.type) {
                        var z = x.unit_type;
                        x.coast && (z = {
                            type: x.unit_type,
                            coast: x.coast
                        });
                        d[a] = z
                    }
                }
            }
            $(this.events_).trigger("DRAW_UNIT_TEXT", {
                player: e,
                units: h[e]
            })
        }
    "NEEDS_BUILDS" === this.gamestate_.stage() && this.initBuilds();
    for (e in f)
        for (a in c = f[e],
        c)
            this.drawOrder_(a, c[a], e);
    this.registerUnloadEvent();
    var E = this;
    $(this.events_).bind("CLICK_TERRITORY", function(a, c) {
        E.handleUpdateOrder(c.terName, c.coast, c.unitType)
    });
    $(this.events_).bind("SET_STATE", function(a, c) {
        E.handleUpdateFooState(c.state)
    });
    $(this.events_).bind("SET_RETREAT", function(a, c) {
        E.handleUpdateRetreatState(c.terName, c.retreatTo)
    });
    $(this.events_).bind("MOUSEOVER_TERRITORY", function(a, c) {
        E.highlightTerritory(c.terName, c.coast)
    });
    $(this.events_).bind("MOUSEOUT_TERRITORY", function(a, c) {
        E.fadeTerritory(c.terName)
    })
}
;
tilegames.OrderEventHandler.prototype.registerUnloadEvent = function() {
    window.onbeforeunload = function() {
        if (this.unsavedChanges_)
            return "You have unsaved changes."
    }
    ;
    var a = this;
    $("#orders_prompt").on("click", "#submit_orders_button", function() {
        a.setUnsavedChanges(!1)
    });
    $("#orders_prompt").on("click", "#early_adjudication", function() {
        a.setUnsavedChanges(!0)
    })
}
;
tilegames.OrderEventHandler.prototype.handleUpdateOrder = function(a, e, h) {
    var f = this.gamestate_.stage();
    $("#edit-tab").hasClass("active") ? $(this.events_).trigger("EDITING_STATE", {
        terName: a,
        coast: e,
        unitType: h
    }) : ("NEEDS_ORDERS" === f && this.handleFooOrders(a, e),
    "NEEDS_BUILDS" === f && this.handleBuildOrders(a, e, h))
}
;
tilegames.OrderEventHandler.prototype.handleBuildOrders = function(a, e, h) {
    var f = this.gamestate_.playerAt(a);
    if (!f || this.activePlayer_ && f != this.activePlayer_) {
        f = this.gamestate_.territoryOwnedBy(a);
        var d = this.gamestate_.unitChangeCount()[f];
        0 >= d || (d = this.gamestate_.buildableTerritories(),
        f && -1 != $.inArray(a, d[f]) && this.handleBuild(a, e, h, f))
    } else
        d = this.gamestate_.unitChangeCount()[f],
        0 <= d || this.handleDisband(a, h, f)
}
;
tilegames.OrderEventHandler.prototype.handleDisband = function(a, e, h) {
    var f = null;
    "keep" != e && ("disband" == e ? f = {
        type: "DISBAND"
    } : (e = null,
    this.orders_[h] && this.orders_[h][a] && (e = this.orders_[h][a].type),
    f = "DISBAND" == e ? null : {
        type: "DISBAND"
    }));
    this.updateOrder(h, a, f)
}
;
tilegames.OrderEventHandler.prototype.handleBuild = function(a, e, h, f) {
    var d = "A"
      , c = null;
    "all" != e && (c = e);
    h && (d = h);
    !h && this.orders_[f] && this.orders_[f][a] && (h = this.orders_[f][a].unit_type,
    d = "A" == h ? jQuery.isEmptyObject(this.map_.territories[a].w_neighbors) ? "none" : "F" : "F" == h ? "all" != e ? e == this.orders_[f][a].coast ? "none" : "F" : "none" : "A");
    if ("F" == d || "A" == d) {
        var x = {
            type: "BUILD",
            unit_type: d
        };
        "F" == d && c && (x.coast = c)
    }
    this.updateOrder(f, a, x)
}
;
tilegames.OrderEventHandler.prototype.initBuilds = function() {
    var a = this.gamestate_.unitChangeCount()
      , e = this.gamestate_.buildableTerritories()
      , h = this.gamestate_.unbuildableTerritories();
    if (a)
        for (var f in a) {
            var d = this.gamestate_.playerUnits(f)
              , c = this.eliminatedForBuilds(d, a[f]);
            $(this.events_).trigger("DRAW_BUILD", {
                player: f,
                units: d,
                isDisabled: c,
                playerUnitChangeCount: a[f],
                playerBuildableTerritories: e[f] || [],
                playerUnbuildableTerritories: h[f] || []
            })
        }
}
;
tilegames.OrderEventHandler.prototype.eliminatedForBuilds = function(a, e) {
    if (a) {
        var h = 0, f;
        for (f in a)
            h++;
        if (0 === h + e)
            return !0
    }
    return !1
}
;
tilegames.OrderEventHandler.prototype.handleFooOrders = function(a, e) {
    this.state_ == this.WAITING ? this.handleWaitingStateClick(a, e) && (this.highlightPrimaryTerritory(a),
    $("#hint").html("<p>Selected <strong>" + this.selected_ + "</strong>. You may now:</p><ol><li>Select an adjacent territory to move/attack that territory.</li><li>Click the same territory to issue a hold order.</li><li>Press '<strong>s</strong>' to issue a support order.</li><li>Press '<strong>c</strong>' to issue a convoy order.</li></ol>"),
    $(".order-buttons button").prop("disabled", !1)) : this.state_ == this.SELECTED ? a == this.selected_ ? this.setOrderToHold() : this.setOrderToMove(a, e) : this.state_ == this.SUPPORT ? null == this.target_ ? this.handleSupportStateSourceClick(a, e) && (this.highlightSecondaryTerritory(this.target_),
    $("#hint").html("<p><strong>" + this.selected_ + "</strong> supporting <strong>" + this.target_ + "</strong>.  Click the same territory to support a hold, support, or convoy.  To support a move, click the destination territory.</p>")) : this.handleSupportStateTargetClick(a, e) : this.state_ == this.CONVOY && (null == this.target_ ? this.handleConvoyStateSourceClick(a, e) && (this.highlightSecondaryTerritory(this.target_),
    $("#hint").html("<p><strong>" + this.selected_ + "</strong> convoying <strong>" + this.target_ + "</strong> to ...?</p>")) : this.handleConvoyStateTargetClick(a, e))
}
;
tilegames.OrderEventHandler.prototype.handleUpdateFooState = function(a) {
    $(".order-buttons button").removeClass("active");
    "SUPPORT" == a ? this.state_ != a && this.state_ != this.WAITING && (this.target_ = null,
    this.state_ = this.SUPPORT,
    $("#hint").html("<p>Issuing a support order to <strong>" + this.selected_ + "</strong>.  Select a unit to support."),
    $("#order_button_support").addClass("active")) : "CONVOY" == a ? this.state_ != a && this.state_ != this.WAITING && (this.target_ = null,
    this.state_ = this.CONVOY,
    $("#order_button_convoy").addClass("active"),
    $("#hint").html("<p>Issuing a convoy order to <strong>" + this.selected_ + "</strong>.  Select an army to convoy.")) : "HOLD" == a ? this.state_ != a && this.state_ != this.WAITING && this.setOrderToHold() : "MOVE" == a ? this.state_ != a && this.state_ != this.WAITING && (this.state_ = this.SELECTED,
    $("#order_button_move").addClass("active"),
    $("#hint").html("<p>Selected <strong>" + this.selected_ + "</strong>. You may now:</p><ol><li>Select an adjacent territory to move/attack that territory.</li><li>Click the same territory to issue a hold order.</li><li>Press '<strong>s</strong>' to issue a support order.</li><li>Press '<strong>c</strong>' to issue a convoy order.</li></ol>")) : ($(".order-buttons button").prop("disabled", !0),
    this.resetState())
}
;
tilegames.OrderEventHandler.prototype.handleUpdateRetreatState = function(a, e) {
    var h = this.gamestate_.playerAt(a)
      , f = {};
    if ("DISBAND" == e)
        f.type = "DISBAND";
    else {
        f.type = "MOVE";
        if ("MOVE" == f.type && 3 < e.length) {
            var d = e.substring(3, 5);
            e = e.substring(0, 3);
            f.to_coast = d
        }
        f.to = e
    }
    this.updateOrder(h, a, f)
}
;
tilegames.OrderEventHandler.prototype.setOrderToHold = function() {
    this.updateOrder(this.gamestate_.playerAt(this.selected_), this.selected_, {
        type: "HOLD"
    });
    $("#order_button_hold").effect("highlight", {}, "slow");
    this.resetState()
}
;
tilegames.OrderEventHandler.prototype.setOrderToMove = function(a, e) {
    var h = {
        type: "MOVE",
        to: a
    };
    e && this.doCoastsMatter(a) && (h.to_coast = e);
    this.updateOrder(this.gamestate_.playerAt(this.selected_), this.selected_, h);
    this.resetState();
    $("#order_button_move").effect("highlight", {}, "slow")
}
;
tilegames.OrderEventHandler.prototype.handleSupportStateSourceClick = function(a, e) {
    if (this.selected_ == a || !this.gamestate_.playerAt(a))
        return !1;
    this.target_ = a;
    return !0
}
;
tilegames.OrderEventHandler.prototype.handleSupportStateTargetClick = function(a, e) {
    var h = {
        type: "SUPPORT",
        from: this.target_
    };
    a != this.target_ && (h.to = a);
    e && this.doCoastsMatter(a) && (h.to_coast = e);
    this.updateOrder(this.gamestate_.playerAt(this.selected_), this.selected_, h);
    this.resetState();
    $("#order_button_support").effect("highlight", {}, "slow");
    return !0
}
;
tilegames.OrderEventHandler.prototype.handleConvoyStateSourceClick = function(a, e) {
    if (!this.gamestate_.playerAt(a))
        return !1;
    this.target_ = a;
    return !0
}
;
tilegames.OrderEventHandler.prototype.handleConvoyStateTargetClick = function(a, e) {
    a = {
        type: "CONVOY",
        from: this.target_,
        to: a
    };
    this.updateOrder(this.gamestate_.playerAt(this.selected_), this.selected_, a);
    this.resetState();
    $("#convoy_button_support").effect("highlight", {}, "slow");
    return !0
}
;
tilegames.OrderEventHandler.prototype.updateOrder = function(a, e, h) {
    this.orders_[a] || (this.orders_[a] = {});
    "NEEDS_RETREATS" === this.gamestate_.stage() ? (this.orders_[a][e].retreat = h,
    this.updateRetreatOrderParam(a)) : (h ? this.orders_[a][e] = h : delete this.orders_[a][e],
    $("#input_orders").val(JSON.stringify(this.orders_)));
    this.drawOrder_(e, this.orders_[a][e], a);
    this.setUnsavedChanges(!0);
    this.renderUnsubmittedOrderAlert()
}
;
tilegames.OrderEventHandler.prototype.renderUnsubmittedOrderAlert = function() {
    null === document.getElementById("unsubmitted-orders-alert") && "game" === gameType && (document.getElementById("alert").innerHTML += '<p class="text-warning" id="unsubmitted-orders-alert">You have unsaved orders.</p>',
    document.getElementById("unsubmitted-orders-alert-icon").classList.remove("d-none"))
}
;
tilegames.OrderEventHandler.prototype.drawOrder_ = function(a, e, h) {
    e = {
        terName: a,
        order: e,
        fullOrder: this.buildFullOrderObj(h, a, e)
    };
    "NEEDS_BUILDS" === this.gamestate_.stage() && (e.unitChangeCount = this.calculateUnitChangeCount(h));
    $(this.events_).trigger("DRAW_ORDER", e)
}
;
tilegames.OrderEventHandler.prototype.calculateUnitChangeCount = function(a) {
    var e = this.gamestate_.unitChangeCount()[a];
    1 > e && (e *= -1);
    this.orders_[a] && $.each(this.orders_[a], function(a, f) {
        e--
    });
    return e
}
;
tilegames.OrderEventHandler.prototype.updateRetreatOrderParam = function(a) {
    var e = JSON.parse($("#input_orders").val());
    e[a] = {};
    var h = this.orders_[a], f;
    for (f in h)
        "retreat"in this.orders_[a][f] && (e[a][f] = this.orders_[a][f].retreat);
    $("#input_orders").val(JSON.stringify(e))
}
;
tilegames.OrderEventHandler.prototype.setUnsavedChanges = function(a) {
    this.unsavedChanges_ = !0;
    a = [$("#submit_orders_button")];
    for (var e = 0; e < a.length; e++)
        a[e] && a[e].removeAttr("disabled")
}
;
tilegames.OrderEventHandler.prototype.buildFullOrderObj = function(a, e, h) {
    var f = {};
    f.player = a;
    f.unitTerritory = e;
    if (!h)
        return f;
    f.type = this.gamestate_.unitTypeAt(f.unitTerritory);
    f.type && (f.type.coast ? (f.unitType = f.type.type,
    f.unitCoast = f.type.coast) : f.unitType = f.type);
    f.orderType = h.type;
    switch (f.orderType) {
    case "MOVE":
        f.moveTarget = h.to;
        h.to_coast && (f.moveTargetCoast = h.to_coast);
        break;
    case "SUPPORT":
        f.supportedUnitTerritory = h.from;
        f.supportedType = this.gamestate_.unitTypeAt(f.supportedUnitTerritory);
        f.supportedType && f.supportedType.coast && (f.supportedUnitType = f.supportedType.type,
        f.supportedUnitCoast = f.supportedType.coast);
        h.to_coast && (f.supportedUnitMoveOrderCoast = h.to_coast);
        h.to && (f.supportedUnitMoveOrder = h.to);
        break;
    case "CONVOY":
        f.convoyedUnitTerritory = h.from;
        f.convoyedUnitMoveTarget = h.to;
        break;
    case "BUILD":
        f.unitType = h.unit_type,
        f.unitCoast = h.coast
    }
    f.result = h.result;
    "FAILS" == h.result && h.retreat && (f.retreat = h.retreat);
    f.resultReason = h.result_reason;
    f.retreatOptions = this.gamestate_.retreatOptions(e);
    return f
}
;
tilegames.OrderEventHandler.prototype.highlightTerritory = function(a, e) {
    var h = {
        name: a,
        owner: this.gamestate_.territoryOwnedBy(a),
        unit: this.gamestate_.playerAt(a),
        type: this.gamestate_.unitTypeAt(a)
    };
    this.selected_ != a && this.target_ != a && $(this.events_).trigger("HIGHLIGHT_TERRITORY", {
        territory: h,
        coast: this.doCoastsMatter(a) ? e : null
    })
}
;
tilegames.OrderEventHandler.prototype.fadeTerritory = function(a) {
    this.selected_ != a && this.target_ != a && $(this.events_).trigger("FADE_TERRITORY", {
        terName: a
    })
}
;
tilegames.OrderEventHandler.prototype.highlightPrimaryTerritory = function(a) {
    $(this.events_).trigger("HIGHLIGHT_PRIMARY_TERRITORY", {
        terName: a
    })
}
;
tilegames.OrderEventHandler.prototype.highlightSecondaryTerritory = function(a) {
    $(this.events_).trigger("HIGHLIGHT_SECONDARY_TERRITORY", {
        terName: a
    })
}
;
tilegames.OrderEventHandler.prototype.handleWaitingStateClick = function(a, e) {
    if (!this.gamestate_.playerAt(a) || this.activePlayer_ && !(a in this.gamestate_.unitsByPlayer()[this.activePlayer_]))
        return !1;
    this.selected_ = a;
    this.state_ = this.SELECTED;
    return !0
}
;
tilegames.OrderEventHandler.prototype.doCoastsMatter = function(a) {
    return $("#edit-tab").hasClass("active") && 0 < $(".add_fleet").filter(".active").length ? !0 : !this.selected_ || this.state_ == this.WAITING || this.state_ == this.CONVOY || a && !this.map_.territories[a].coasts ? !1 : this.state_ == this.SELECTED ? (a = this.gamestate_.unitTypeAt(this.selected_)) && ("F" == a || a.type && "F" == a.type) : this.state_ == this.SUPPORT ? this.target_ ? (a = this.gamestate_.unitTypeAt(this.target_)) && ("F" == a || a.type && "F" == a.type) : !1 : !1
}
;
tilegames.OrderEventHandler.prototype.resetState = function() {
    if (this.selected_) {
        var a = this.selected_;
        this.selected_ = null;
        this.fadeTerritory(a)
    }
    this.target_ && (a = this.target_,
    this.target_ = null,
    this.fadeTerritory(a));
    this.state_ = this.WAITING;
    $("#hint").html("");
    document.getElementById("order_button_hold").disabled = !0;
    document.getElementById("order_button_move").disabled = !0;
    document.getElementById("order_button_convoy").disabled = !0;
    document.getElementById("order_button_support").disabled = !0;
    $("#order_buttons button.active").removeClass("active")
}
;
var TextRenderer = function(a, e, h, f, d, c, x) {
    function z(a, c) {
        return 0 < c ? 'Up to <strong id="' + a + '_count" class="build_disband_count">' + c + "</strong> more builds." : 0 > c ? 'Has <strong id="' + a + '_count" class="build_disband_count">' + -1 * c + "</strong> more disbands." : ""
    }
    function E(a, c, d, f) {
        var h = c ? " disabled" : ""
          , u = ['<table player="', a, '" id="', a, '_builds_table" class="build_disband_table builds_table">', "<tr><th>&nbsp;</th><th>None</th><th>Army</th><th>Fleet</th></tr>"];
        $.each(d, function(a, c) {
            "Stp" == c ? u = u.concat(['<tr id="', c, '_build_row">', "<td>", c, "</td>", '<td><input type="radio" class="form-check-input"', h, ' name="', c, '"id="', c, '_none" value="none" checked="checked"></td>', '<td><input type="radio" class="form-check-input"', h, ' name="', c, '"id="', c, '_A" value="A"></td>', '<td><input type="radio" class="form-check-input"', h, ' name="', c, '"id="', c, '_F_sc" value="sc"><label class="form-check-label">sc</label></td>', '<td><input type="radio" class="form-check-input"', h, ' name="', c, '"id="', c, '_F_nc" value="nc">nc</td></tr>']) : (u = u.concat(['<tr id="', c, '_build_row">', "<td>", c, "</td>", '<td><input type="radio" class="form-check-input"', h, ' name="', c, '"id="', c, '_none" value="none" checked="checked"></td>', '<td><input type="radio" class="form-check-input"', h, ' name="', c, '"id="', c, '_A" value="A"></td>', '<td><input type="radio" class="form-check-input"', h, ' name="', c, '"id="', c, '_F" value="F"']),
            jQuery.isEmptyObject(e.territories[c].w_neighbors) && u.push(" disabled"),
            u.push("></td></tr>"))
        });
        $.each(f, function(a, c) {
            u = u.concat(['<tr id="', c[0], '_nobuild_row">', "<td>", c[0], "</td>", '<td colspan="4">', c[1], "</td></tr>"])
        });
        u.push("</table>");
        return u.join("")
    }
    function N(a, c, d) {
        var e = c ? " disabled" : ""
          , f = ['<table player="', a, '" id="', a, '_disbands_table" class="build_disband_table disbands_table">', "<tr><th>&nbsp;</th><th>Keep</th><th>Disband</th></tr>"];
        $.each(d, function(a, c) {
            f = f.concat(['<tr id="', a, '_build_row">', "<td><code>", a, "</code></td>", '<td><input type="radio"', e, ' name="', a, '" id="' + a + '_none" value="keep" checked="checked"></td>', '<td><input type="radio"', e, ' name="', a, '" id="disband_' + a + '" value="disband"></td>', "</tr>"])
        });
        f.push("</table>");
        return f.join("")
    }
    function F(a, c, d) {
        var e = '<tr><th><div class="country"><span class="country-icon ' + a + '"><i class="fas fa-square"></i></span>' + a + "</div></th><td>";
        $.each(c, function(a, c) {
            e += '<p id="order_' + a + '" class="orderstring" ter="' + a + '">' + G(a, c) + "</p>"
        });
        e += "</td></tr>";
        $("#orders-text").append(e)
    }
    function G(a, c) {
        var d = c;
        "object" === typeof d && (d = d.type,
        a += "/" + c.coast);
        return d + " " + a
    }
    (function() {
        $(a).bind("DRAW_BUILD", function(a, c) {
            a = c.player;
            var e = c.units
              , u = c.isDisabled || h
              , p = c.playerUnitChangeCount
              , x = c.playerBuildableTerritories;
            c = c.playerUnbuildableTerritories;
            var y = '<tr><th><div class="country"><span class="country-icon ' + a + '"><i class="fas fa-square"></i></span>' + a + "</div></th>";
            y = 0 < p && (d || f == a) ? y + ("<td>" + z(a, p) + "<br>" + E(a, u, x, c) + "</td>") : 0 > p && (d || f == a) ? y + ("<td>" + z(a, p) + "<br>" + N(a, u, e) + "</td>") : y + ("<td>" + z(a, p) + "</td>");
            y += "</tr>";
            $("#orders-text").append(y)
        });
        $(a).bind("DRAW_UNIT_TEXT", function(a, d) {
            var f = {};
            if (x) {
                a = $jscomp.makeIterator(Object.entries(x));
                for (var h = a.next(); !h.done; h = a.next()) {
                    var p = $jscomp.makeIterator(h.value);
                    h = p.next().value;
                    p = p.next().value;
                    p in f || (f[p] = new Set);
                    f[p].add(h)
                }
            }
            if ("sandbox" === c) {
                a = d.player;
                h = f[d.player];
                f = '<tr id="' + a + '_edit_text_orders">' + ('<th><div class="country"><span class="country-icon ' + a + '">') + ('<i class="fas fa-square"></i></span>' + a + "</div></th>") + ('<td><div id="' + a + '_units">');
                p = $jscomp.makeIterator(Object.entries(d.units));
                for (var y = p.next(); !y.done; y = p.next()) {
                    var z = $jscomp.makeIterator(y.value);
                    y = z.next().value;
                    z = z.next().value;
                    f += '<button type="button" class="btn btn-outline-danger remove_unit mb-1" ' + ('id="edit_unit_' + y + '" ter="' + y + '"') + ('country="' + a + '"><i class="fas fa-times"></i> ') + G(y, z) + "</button> "
                }
                f += '</div><div id="' + a + '_supplycenters">';
                if (h)
                    for (h = $jscomp.makeIterator(h),
                    p = h.next(); !p.done; p = h.next())
                        p = p.value,
                        "sc"in e.territories[p] && (f += '<button type="button" class="btn btn-outline-danger remove_supply_center mb-1" ' + ('id="edit_sc_' + p + '" ter=' + p + '><i class="fas fa-times"></i> ') + ("SC " + p + " ") + "</button> ");
                f = f + '</div></p><div class="btn-group" role="group" data-bs-toggle="buttons">' + ('<button type="button" class="btn btn-outline-success add_army mb-1" ' + ('id="' + a + '_add_army" country="' + a + '">+ Army</button> ')) + ('<button type="button" class="btn btn-outline-success add_fleet mb-1" ' + ('id="' + a + '_add_fleet" country="' + a + '">+ Fleet</button> ')) + ('<button type="button" class="btn btn-outline-success add_territory mb-1" ' + ('id="' + a + '_add_territory" country="' + a + '">+ SC</button>')) + "</div></td></tr>";
                $("#edit-text").append(f)
            }
            F(d.player, d.units, !1)
        });
        $(a).bind("DRAW_ORDER", function(a, c) {
            a = c.terName;
            var d = c.fullOrder;
            var e = "";
            "FAILS" == d.result && (e += '<span class="text-danger">');
            e += d.unitType + " " + d.unitTerritory;
            d.unitCoast && (e += "/" + d.unitCoast);
            var f = $("#" + d.unitTerritory + "_none");
            0 < f.length && (f[0].checked = !0);
            switch (d.orderType) {
            case "HOLD":
                e += " H";
                break;
            case "MOVE":
                e += " - " + d.moveTarget;
                d.moveTargetCoast && (e += "/" + d.moveTargetCoast);
                break;
            case "SUPPORT":
                e += " S " + d.supportedUnitTerritory;
                d.supportedUnitCoast && (e += "/" + d.supportedUnitCoast);
                d.supportedUnitMoveOrder && (e += " - " + d.supportedUnitMoveOrder,
                d.supportedUnitMoveOrderCoast && (e += "/" + d.supportedUnitMoveOrderCoast));
                break;
            case "CONVOY":
                e += " C " + d.convoyedUnitTerritory + " - " + d.convoyedUnitMoveTarget;
                break;
            case "BUILD":
                f = $("#" + d.unitTerritory + "_" + d.unitType + (d.unitCoast ? "_" + d.unitCoast : ""));
                0 < f.length && (f[0].checked = !0);
                e += " Build";
                break;
            case "DISBAND":
                f = $("#disband_" + d.unitTerritory),
                0 < f.length && (f[0].checked = !0),
                e += " Disband"
            }
            d.result && (e += ' <i class="fas fa-long-arrow-alt-right"></i> ' + d.result,
            "FAILS" == d.result && (e += " (" + d.resultReason + ")</span>"));
            if (d.retreatOptions) {
                var h = null;
                d.retreat && "MOVE" == d.retreat.type ? (h = d.retreat.to,
                d.retreat.to_coast && (h += d.retreat.to_coast)) : d.retreat && "DISBAND" == d.retreat.type && (h = d.retreat.type);
                f = d.retreatOptions;
                var x = d.unitTerritory
                  , y = !1
                  , M = "";
                for (i in f) {
                    var z = f[i]
                      , F = z;
                    5 == z.length && (F = z.substring(0, 3) + "/" + z.substring(3, 5));
                    h == z ? (y = !0,
                    M += '<option selected="selected" value="' + z + '">' + F + "</option>") : M += '<option value="' + z + '">' + F + "</option>"
                }
                y || (M = '<option disabled selected="selected" value="">Select a retreat option</option>' + M);
                e += '<select class="form-select form-control-sm" territory="' + x + '" style="width: auto;">' + M + "</select>"
            }
            d.retreat && (e += '<br>&nbsp;&nbsp;<span class="text-warning"><i class="fas fa-angle-double-right"></i> ',
            "MOVE" == d.retreat.type ? e += "Retreat to " + d.retreat.to : "DISBAND" == d.retreat.type && (e += "Disband"),
            d.retreat.result && (e = e + ' <i class="fas fa-long-arrow-alt-right"></i> ' + d.retreat.result));
            d = e + "</span>";
            $("#order_" + a).html(d);
            "unitChangeCount"in c && $("#" + c.fullOrder.player + "_count").html(c.unitChangeCount)
        });
        $(a).bind("HIGHLIGHT_TERRITORY", function(a, c) {
            a = c.territory.name;
            $(".highlight_text_order").removeClass("highlight_text_order");
            $("#order_" + a).addClass("highlight_text_order")
        })
    }
    )()
};
var ToolTipRenderer = function(a, e) {
    (function() {
        $(a).bind("HIGHLIGHT_TERRITORY", function(a, f) {
            a = f.territory;
            var d = a.name;
            f = d + " <em>(" + e.territories[d].name + ")</em><br>";
            e.territories[d].sc && (f = a.owner ? f + e.playerDescriptions[a.owner].possessive : f + "Unowned",
            f += " Supply Center<br>");
            a.unit && (d = a.type,
            "object" === typeof d && (d = d.type),
            f += e.playerDescriptions[a.unit].possessive + " " + e.unitNames[d] + "<br>");
            window.status = f;
            tooltip.html(f).show()
        });
        $(a).bind("FADE_TERRITORY", function(a, e) {
            $("#tooltip").hide()
        });
        tooltip = $("#tooltip");
        0 === tooltip.length && (tooltip = $('<div id="tooltip" class="d-none"></div>').prependTo("body"));
        $(document).mousemove(function(a) {
            $("#tooltip").css({
                left: a.pageX + 10 + "px",
                top: a.pageY + 10 + "px"
            })
        })
    }
    )()
};
$(function() {
    function a(a) {
        $("#sandbox_remove_" + a).prop("disabled", !0);
        $.ajax({
            url: "/sandbox/" + a + "/ajax/remove",
            type: "POST",
            data: {
                session_id: $("#session_id").val()
            },
            success: function(e) {
                $("#sandbox_" + a + ", tr.child").remove()
            },
            error: function(e, f, d) {
                $("#sandbox_remove_" + a).attr("disabled", !1)
            }
        });
        return !1
    }
    $(document).on("click", ".sandbox_remove", function() {
        var e = this.id.replace("sandbox_remove_", "");
        a(e)
    })
});
!function(a, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Raphael = e() : a.Raphael = e()
}(window, function() {
    return function(a) {
        function e(f) {
            if (h[f])
                return h[f].exports;
            var d = h[f] = {
                i: f,
                l: !1,
                exports: {}
            };
            return a[f].call(d.exports, d, d.exports, e),
            d.l = !0,
            d.exports
        }
        var h = {};
        return e.m = a,
        e.c = h,
        e.d = function(a, d, c) {
            e.o(a, d) || Object.defineProperty(a, d, {
                enumerable: !0,
                get: c
            })
        }
        ,
        e.r = function(a) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(a, "__esModule", {
                value: !0
            })
        }
        ,
        e.t = function(a, d) {
            if ((1 & d && (a = e(a)),
            8 & d) || 4 & d && "object" == typeof a && a && a.__esModule)
                return a;
            var c = Object.create(null);
            if (e.r(c),
            Object.defineProperty(c, "default", {
                enumerable: !0,
                value: a
            }),
            2 & d && "string" != typeof a)
                for (var f in a)
                    e.d(c, f, function(c) {
                        return a[c]
                    }
                    .bind(null, f));
            return c
        }
        ,
        e.n = function(a) {
            var d = a && a.__esModule ? function() {
                return a.default
            }
            : function() {
                return a
            }
            ;
            return e.d(d, "a", d),
            d
        }
        ,
        e.o = function(a, d) {
            return Object.prototype.hasOwnProperty.call(a, d)
        }
        ,
        e.p = "",
        e(e.s = 1)
    }([function(a, e, h) {
        var f;
        h = [h(2)];
        void 0 === (f = function(a) {
            function c(g) {
                if (c.is(g, "function"))
                    return ca ? g() : a.on("raphael.DOMload", g);
                if (c.is(g, Z))
                    return c._engine.create[n](c, g.splice(0, 3 + c.is(g[0], R))).add(g);
                var w = Array.prototype.slice.call(arguments, 0);
                if (c.is(w[w.length - 1], "function")) {
                    var b = w.pop();
                    return ca ? b.call(c._engine.create[n](c, w)) : a.on("raphael.DOMload", function() {
                        b.call(c._engine.create[n](c, w))
                    })
                }
                return c._engine.create[n](c, arguments)
            }
            function d(g) {
                if ("function" == typeof g || Object(g) !== g)
                    return g;
                var a = new g.constructor, b;
                for (b in g)
                    g.hasOwnProperty(b) && (a[b] = d(g[b]));
                return a
            }
            function e(g, a, b) {
                return function D() {
                    var w = Array.prototype.slice.call(arguments, 0)
                      , c = w.join("\u2400")
                      , A = D.cache = D.cache || {}
                      , d = D.count = D.count || [];
                    if (A.hasOwnProperty(c)) {
                        a: {
                            w = 0;
                            for (var e = d.length; w < e; w++)
                                if (d[w] === c) {
                                    d.push(d.splice(w, 1)[0]);
                                    break a
                                }
                        }
                        c = b ? b(A[c]) : A[c]
                    } else
                        c = (1E3 <= d.length && delete A[d.shift()],
                        d.push(c),
                        A[c] = g[n](a, w),
                        b ? b(A[c]) : A[c]);
                    return c
                }
            }
            function f() {
                return this.hex
            }
            function h(g, a) {
                for (var b = [], w = 0, c = g.length; c - 2 * !a > w; w += 2) {
                    var d = [{
                        x: +g[w - 2],
                        y: +g[w - 1]
                    }, {
                        x: +g[w],
                        y: +g[w + 1]
                    }, {
                        x: +g[w + 2],
                        y: +g[w + 3]
                    }, {
                        x: +g[w + 4],
                        y: +g[w + 5]
                    }];
                    a ? w ? c - 4 == w ? d[3] = {
                        x: +g[0],
                        y: +g[1]
                    } : c - 2 == w && (d[2] = {
                        x: +g[0],
                        y: +g[1]
                    },
                    d[3] = {
                        x: +g[2],
                        y: +g[3]
                    }) : d[0] = {
                        x: +g[c - 2],
                        y: +g[c - 1]
                    } : c - 4 == w ? d[3] = d[2] : w || (d[0] = {
                        x: +g[w],
                        y: +g[w + 1]
                    });
                    b.push(["C", (-d[0].x + 6 * d[1].x + d[2].x) / 6, (-d[0].y + 6 * d[1].y + d[2].y) / 6, (d[1].x + 6 * d[2].x - d[3].x) / 6, (d[1].y + 6 * d[2].y - d[3].y) / 6, d[2].x, d[2].y])
                }
                return b
            }
            function F(g, a, b, c, d, e, k, l, f) {
                null == f && (f = 1);
                f = (1 < f ? 1 : 0 > f ? 0 : f) / 2;
                for (var w = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], A = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], O = 0, D = 0; 12 > D; D++) {
                    var H = f * w[D] + f
                      , ua = H * (H * (-3 * g + 9 * b - 9 * d + 3 * k) + 6 * g - 12 * b + 6 * d) - 3 * g + 3 * b;
                    H = H * (H * (-3 * a + 9 * c - 9 * e + 3 * l) + 6 * a - 12 * c + 6 * e) - 3 * a + 3 * c;
                    O += A[D] * q.sqrt(ua * ua + H * H)
                }
                return f * O
            }
            function G(g, a, b) {
                g = c._path2curve(g);
                a = c._path2curve(a);
                for (var w, A, d, e, k, f, l, q, h, p, I = b ? 0 : [], ja = 0, u = g.length; ja < u; ja++) {
                    var n = g[ja];
                    if ("M" == n[0])
                        w = k = n[1],
                        A = f = n[2];
                    else {
                        "C" == n[0] ? (h = [w, A].concat(n.slice(1)),
                        w = h[6],
                        A = h[7]) : (h = [w, A, w, A, k, f, k, f],
                        w = k,
                        A = f);
                        n = 0;
                        for (var x = a.length; n < x; n++) {
                            var X = a[n];
                            if ("M" == X[0])
                                d = l = X[1],
                                e = q = X[2];
                            else {
                                "C" == X[0] ? (p = [d, e].concat(X.slice(1)),
                                d = p[6],
                                e = p[7]) : (p = [d, e, d, e, l, q, l, q],
                                d = l,
                                e = q);
                                var B = h
                                  , R = p;
                                X = b;
                                var t = c.bezierBBox(B)
                                  , y = c.bezierBBox(R);
                                if (c.isBBoxIntersect(t, y)) {
                                    t = F.apply(0, B);
                                    y = F.apply(0, R);
                                    t = m(~~(t / 5), 1);
                                    y = m(~~(y / 5), 1);
                                    for (var M = [], C = [], Y = {}, Z = X ? 0 : [], z = 0; z < t + 1; z++) {
                                        var N = c.findDotsAtSegment.apply(c, B.concat(z / t));
                                        M.push({
                                            x: N.x,
                                            y: N.y,
                                            t: z / t
                                        })
                                    }
                                    for (z = 0; z < y + 1; z++)
                                        N = c.findDotsAtSegment.apply(c, R.concat(z / y)),
                                        C.push({
                                            x: N.x,
                                            y: N.y,
                                            t: z / y
                                        });
                                    for (z = 0; z < t; z++)
                                        for (B = 0; B < y; B++) {
                                            var E = M[z]
                                              , G = M[z + 1];
                                            R = C[B];
                                            N = C[B + 1];
                                            var V = .001 > r(G.x - E.x) ? "y" : "x"
                                              , ca = .001 > r(N.x - R.x) ? "y" : "x";
                                            b: {
                                                var Q = E.x;
                                                var U = E.y
                                                  , K = G.x
                                                  , S = G.y
                                                  , J = R.x
                                                  , ia = R.y
                                                  , L = N.x
                                                  , W = N.y;
                                                if (!(m(Q, K) < v(J, L) || v(Q, K) > m(J, L) || m(U, S) < v(ia, W) || v(U, S) > m(ia, W))) {
                                                    var T = (Q - K) * (ia - W) - (U - S) * (J - L);
                                                    if (T) {
                                                        var P = ((Q * S - U * K) * (J - L) - (Q - K) * (J * W - ia * L)) / T;
                                                        T = ((Q * S - U * K) * (ia - W) - (U - S) * (J * W - ia * L)) / T;
                                                        var oa = +P.toFixed(2)
                                                          , pa = +T.toFixed(2);
                                                        if (!(oa < +v(Q, K).toFixed(2) || oa > +m(Q, K).toFixed(2) || oa < +v(J, L).toFixed(2) || oa > +m(J, L).toFixed(2) || pa < +v(U, S).toFixed(2) || pa > +m(U, S).toFixed(2) || pa < +v(ia, W).toFixed(2) || pa > +m(ia, W).toFixed(2))) {
                                                            Q = {
                                                                x: P,
                                                                y: T
                                                            };
                                                            break b
                                                        }
                                                    }
                                                }
                                                Q = void 0
                                            }
                                            Q && Y[Q.x.toFixed(4)] != Q.y.toFixed(4) && (Y[Q.x.toFixed(4)] = Q.y.toFixed(4),
                                            E = E.t + r((Q[V] - E[V]) / (G[V] - E[V])) * (G.t - E.t),
                                            R = R.t + r((Q[ca] - R[ca]) / (N[ca] - R[ca])) * (N.t - R.t),
                                            0 <= E && 1.001 >= E && 0 <= R && 1.001 >= R && (X ? Z++ : Z.push({
                                                x: Q.x,
                                                y: Q.y,
                                                t1: v(E, 1),
                                                t2: v(R, 1)
                                            })))
                                        }
                                    X = Z
                                } else
                                    X = X ? 0 : [];
                                if (b)
                                    I += X;
                                else {
                                    t = 0;
                                    for (y = X.length; t < y; t++)
                                        X[t].segment1 = ja,
                                        X[t].segment2 = n,
                                        X[t].bez1 = h,
                                        X[t].bez2 = p;
                                    I = I.concat(X)
                                }
                            }
                        }
                    }
                }
                return I
            }
            function y(g, a, b, c, d, e) {
                null != g ? (this.a = +g,
                this.b = +a,
                this.c = +b,
                this.d = +c,
                this.e = +d,
                this.f = +e) : (this.a = 1,
                this.b = 0,
                this.c = 0,
                this.d = 1,
                this.e = 0,
                this.f = 0)
            }
            function T() {
                return this.x + " " + this.y + " " + this.width + " \u00d7 " + this.height
            }
            function K(g, a, b, c, d, e) {
                var w = 3 * a
                  , A = 3 * (c - a) - w
                  , O = 1 - w - A
                  , k = 3 * b
                  , D = 3 * (d - b) - k
                  , f = 1 - k - D;
                return function(g, a) {
                    g = function(g, a) {
                        var b, c, d;
                        var e = g;
                        for (c = 0; 8 > c; c++) {
                            if (d = ((O * e + A) * e + w) * e - g,
                            r(d) < a)
                                return e;
                            if (1E-6 > r(b = (3 * O * e + 2 * A) * e + w))
                                break;
                            e -= d / b
                        }
                        if (c = 1,
                        (e = g) < (b = 0))
                            return b;
                        if (e > c)
                            return c;
                        for (; b < c && !(d = ((O * e + A) * e + w) * e,
                        r(d - g) < a); )
                            g > d ? b = e : c = e,
                            e = (c - b) / 2 + b;
                        return e
                    }(g, a);
                    return ((f * g + D) * g + k) * g
                }(g, 1 / (200 * e))
            }
            function u(g, a) {
                var b = []
                  , w = {};
                if (this.ms = a,
                this.times = 1,
                g) {
                    for (var c in g)
                        g.hasOwnProperty(c) && (w[S(c)] = g[c],
                        b.push(S(c)));
                    b.sort(lb)
                }
                this.anim = w;
                this.top = b[b.length - 1];
                this.percents = b
            }
            function p(g, b, A, d, e, k) {
                A = S(A);
                var w, O, D, f = g.ms, l = {}, q = {}, H = {};
                if (d)
                    for (m = 0,
                    v = J.length; m < v; m++) {
                        var h = J[m];
                        if (h.el.id == b.id && h.anim == g) {
                            h.percent != A ? (J.splice(m, 1),
                            O = 1) : w = h;
                            b.attr(h.totalOrigin);
                            break
                        }
                    }
                else
                    d = +q;
                for (var m = 0, v = g.percents.length; m < v; m++) {
                    if (g.percents[m] == A || g.percents[m] > d * g.top) {
                        A = g.percents[m];
                        var p = g.percents[m - 1] || 0;
                        f = f / g.top * (A - p);
                        var r = g.percents[m + 1];
                        var I = g.anim[A];
                        break
                    }
                    d && b.attr(g.anim[g.percents[m]])
                }
                if (I) {
                    if (w)
                        w.initstatus = d,
                        w.start = new Date - w.ms * d;
                    else {
                        for (var B in I)
                            if (I.hasOwnProperty(B) && (Ca.hasOwnProperty(B) || b.paper.customAttributes.hasOwnProperty(B)))
                                switch (l[B] = b.attr(B),
                                null == l[B] && (l[B] = mb[B]),
                                q[B] = I[B],
                                Ca[B]) {
                                case R:
                                    H[B] = (q[B] - l[B]) / f;
                                    break;
                                case "colour":
                                    l[B] = c.getRGB(l[B]);
                                    m = c.getRGB(q[B]);
                                    H[B] = {
                                        r: (m.r - l[B].r) / f,
                                        g: (m.g - l[B].g) / f,
                                        b: (m.b - l[B].b) / f
                                    };
                                    break;
                                case "path":
                                    m = sa(l[B], q[B]);
                                    var n = m[1];
                                    l[B] = m[0];
                                    H[B] = [];
                                    m = 0;
                                    for (v = l[B].length; m < v; m++) {
                                        H[B][m] = [0];
                                        for (var u = 1, t = l[B][m].length; u < t; u++)
                                            H[B][m][u] = (n[m][u] - l[B][m][u]) / f
                                    }
                                    break;
                                case "transform":
                                    m = b._;
                                    if (n = nb(m[B], q[B]))
                                        for (l[B] = n.from,
                                        q[B] = n.to,
                                        H[B] = [],
                                        H[B].real = !0,
                                        m = 0,
                                        v = l[B].length; m < v; m++)
                                            for (H[B][m] = [l[B][m][0]],
                                            u = 1,
                                            t = l[B][m].length; u < t; u++)
                                                H[B][m][u] = (q[B][m][u] - l[B][m][u]) / f;
                                    else
                                        n = b.matrix || new y,
                                        m = {
                                            _: {
                                                transform: m.transform
                                            },
                                            getBBox: function() {
                                                return b.getBBox(1)
                                            }
                                        },
                                        l[B] = [n.a, n.b, n.c, n.d, n.e, n.f],
                                        Qa(m, q[B]),
                                        q[B] = m._.transform,
                                        H[B] = [(m.matrix.a - n.a) / f, (m.matrix.b - n.b) / f, (m.matrix.c - n.c) / f, (m.matrix.d - n.d) / f, (m.matrix.e - n.e) / f, (m.matrix.f - n.f) / f];
                                    break;
                                case "csv":
                                    n = P(I[B]).split(M);
                                    v = P(l[B]).split(M);
                                    if ("clip-rect" == B)
                                        for (l[B] = v,
                                        H[B] = [],
                                        m = v.length; m--; )
                                            H[B][m] = (n[m] - l[B][m]) / f;
                                    q[B] = n;
                                    break;
                                default:
                                    for (n = [].concat(I[B]),
                                    v = [].concat(l[B]),
                                    H[B] = [],
                                    m = b.paper.customAttributes[B].length; m--; )
                                        H[B][m] = ((n[m] || 0) - (v[m] || 0)) / f
                                }
                        B = I.easing;
                        m = c.easing_formulas[B];
                        if (!m)
                            if ((m = P(B).match(oa)) && 5 == m.length) {
                                var x = m;
                                m = function(g) {
                                    return K(g, +x[1], +x[2], +x[3], +x[4], f)
                                }
                            } else
                                m = ob;
                        if (h = {
                            anim: g,
                            percent: A,
                            timestamp: D = I.start || g.start || +new Date,
                            start: D + (g.del || 0),
                            status: 0,
                            initstatus: d || 0,
                            stop: !1,
                            ms: f,
                            easing: m,
                            from: l,
                            diff: H,
                            to: q,
                            el: b,
                            callback: I.callback,
                            prev: p,
                            next: r,
                            repeat: k || g.times,
                            origin: b.attr(),
                            totalOrigin: e
                        },
                        J.push(h),
                        d && !w && !O && (h.stop = !0,
                        h.start = new Date - f * d,
                        1 == J.length))
                            return Da();
                        O && (h.start = new Date - h.ms * d);
                        1 == J.length && Ra(Da)
                    }
                    a("raphael.anim.start." + b.id, b, g)
                }
            }
            function U(g) {
                for (var a = 0; a < J.length; a++)
                    J[a].el.paper == g && J.splice(a--, 1)
            }
            c.version = "2.3.0";
            c.eve = a;
            var ca, C, M = /[, ]+/, Q = {
                circle: 1,
                rect: 1,
                path: 1,
                ellipse: 1,
                text: 1,
                image: 1
            }, V = /\{(\d+)\}/g, t = {
                doc: document,
                win: window
            }, W = Object.prototype.hasOwnProperty.call(t.win, "Raphael"), ea = t.win.Raphael, aa = function() {
                this.ca = this.customAttributes = {}
            }, n = "apply", ha = "ontouchstart"in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch, P = String, b = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel".split(" "), k = {
                mousedown: "touchstart",
                mousemove: "touchmove",
                mouseup: "touchend"
            }, l = P.prototype.toLowerCase, q = Math, m = q.max, v = q.min, r = q.abs, I = q.pow, Y = q.PI, R = "number", Z = "array", pa = Object.prototype.toString, ia = (c._ISURL = /^url\(['"]?(.+?)['"]?\)$/i,
            /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i), pb = {
                NaN: 1,
                Infinity: 1,
                "-Infinity": 1
            }, oa = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, Ea = q.round, S = parseFloat, ka = parseInt, Sa = P.prototype.toUpperCase, mb = c._availableAttrs = {
                "arrow-end": "none",
                "arrow-start": "none",
                blur: 0,
                "clip-rect": "0 0 1e9 1e9",
                cursor: "default",
                cx: 0,
                cy: 0,
                fill: "#fff",
                "fill-opacity": 1,
                font: '10px "Arial"',
                "font-family": '"Arial"',
                "font-size": "10",
                "font-style": "normal",
                "font-weight": 400,
                gradient: 0,
                height: 0,
                href: "http://raphaeljs.com/",
                "letter-spacing": 0,
                opacity: 1,
                path: "M0,0",
                r: 0,
                rx: 0,
                ry: 0,
                src: "",
                stroke: "#000",
                "stroke-dasharray": "",
                "stroke-linecap": "butt",
                "stroke-linejoin": "butt",
                "stroke-miterlimit": 0,
                "stroke-opacity": 1,
                "stroke-width": 1,
                target: "_blank",
                "text-anchor": "middle",
                title: "Raphael",
                transform: "",
                width: 0,
                x: 0,
                y: 0,
                class: ""
            }, Ca = c._availableAnimAttrs = {
                blur: R,
                "clip-rect": "csv",
                cx: R,
                cy: R,
                fill: "colour",
                "fill-opacity": R,
                "font-size": R,
                height: R,
                opacity: R,
                path: "path",
                r: R,
                rx: R,
                ry: R,
                stroke: "colour",
                "stroke-opacity": R,
                "stroke-width": R,
                transform: "transform",
                width: R,
                x: R,
                y: R
            }, Fa = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, qb = {
                hs: 1,
                rg: 1
            }, rb = /,?([achlmqrstvxz]),?/gi, sb = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, tb = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, Ta = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi, qa = (c._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
            {}), lb = function(g, a) {
                return S(g) - S(a)
            }, ob = function(g) {
                return g
            }, va = c._rectPath = function(g, a, b, c, d) {
                return d ? [["M", g + d, a], ["l", b - 2 * d, 0], ["a", d, d, 0, 0, 1, d, d], ["l", 0, c - 2 * d], ["a", d, d, 0, 0, 1, -d, d], ["l", 2 * d - b, 0], ["a", d, d, 0, 0, 1, -d, -d], ["l", 0, 2 * d - c], ["a", d, d, 0, 0, 1, d, -d], ["z"]] : [["M", g, a], ["l", b, 0], ["l", 0, c], ["l", -b, 0], ["z"]]
            }
            , Ua = function(g, a, b, c) {
                return null == c && (c = b),
                [["M", g, a], ["m", 0, -c], ["a", b, c, 0, 1, 1, 0, 2 * c], ["a", b, c, 0, 1, 1, 0, -2 * c], ["z"]]
            }, wa = c._getPath = {
                path: function(g) {
                    return g.attr("path")
                },
                circle: function(g) {
                    g = g.attrs;
                    return Ua(g.cx, g.cy, g.r)
                },
                ellipse: function(g) {
                    g = g.attrs;
                    return Ua(g.cx, g.cy, g.rx, g.ry)
                },
                rect: function(g) {
                    g = g.attrs;
                    return va(g.x, g.y, g.width, g.height, g.r)
                },
                image: function(g) {
                    g = g.attrs;
                    return va(g.x, g.y, g.width, g.height)
                },
                text: function(g) {
                    g = g._getBBox();
                    return va(g.x, g.y, g.width, g.height)
                },
                set: function(g) {
                    g = g._getBBox();
                    return va(g.x, g.y, g.width, g.height)
                }
            }, Ga = c.mapPath = function(g, a) {
                if (!a)
                    return g;
                var b, c, w;
                var d = 0;
                for (b = (g = sa(g)).length; d < b; d++) {
                    var e = 1;
                    for (c = (w = g[d]).length; e < c; e += 2) {
                        var k = a.x(w[e], w[e + 1]);
                        var l = a.y(w[e], w[e + 1]);
                        w[e] = k;
                        w[e + 1] = l
                    }
                }
                return g
            }
            ;
            if (c._g = t,
            c.type = t.win.SVGAngle || t.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML",
            "VML" == c.type) {
                var Ha, Ia = t.doc.createElement("div");
                if (Ia.innerHTML = '<v:shape adj="1"/>',
                (Ha = Ia.firstChild).style.behavior = "url(#default#VML)",
                !Ha || "object" != typeof Ha.adj)
                    return c.type = "";
                Ia = null
            }
            c.svg = !(c.vml = "VML" == c.type);
            c._Paper = aa;
            c.fn = C = aa.prototype = c.prototype;
            c._id = 0;
            c.is = function(g, a) {
                return "finite" == (a = l.call(a)) ? !pb.hasOwnProperty(+g) : "array" == a ? g instanceof Array : "null" == a && null === g || a == typeof g && null !== g || "object" == a && g === Object(g) || "array" == a && Array.isArray && Array.isArray(g) || pa.call(g).slice(8, -1).toLowerCase() == a
            }
            ;
            c.angle = function(g, a, b, d, e, k) {
                return null == e ? (g -= b,
                a -= d,
                g || a ? (180 * q.atan2(-a, -g) / Y + 540) % 360 : 0) : c.angle(g, a, e, k) - c.angle(b, d, e, k)
            }
            ;
            c.rad = function(g) {
                return g % 360 * Y / 180
            }
            ;
            c.deg = function(g) {
                return Math.round(180 * g / Y % 360 * 1E3) / 1E3
            }
            ;
            c.snapTo = function(g, a, b) {
                if (b = c.is(b, "finite") ? b : 10,
                c.is(g, Z))
                    for (var w = g.length; w--; ) {
                        if (r(g[w] - a) <= b)
                            return g[w]
                    }
                else {
                    w = a % (g = +g);
                    if (w < b)
                        return a - w;
                    if (w > g - b)
                        return a - w + g
                }
                return a
            }
            ;
            var Va, Wa;
            c.createUUID = (Va = /[xy]/g,
            Wa = function(g) {
                var a = 16 * q.random() | 0;
                return ("x" == g ? a : 3 & a | 8).toString(16)
            }
            ,
            function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(Va, Wa).toUpperCase()
            }
            );
            c.setWindow = function(g) {
                a("raphael.setWindow", c, t.win, g);
                t.win = g;
                t.doc = t.win.document;
                c._engine.initWin && c._engine.initWin(t.win)
            }
            ;
            var xa = function(g) {
                if (c.vml) {
                    var a = /^\s+|\s+$/g;
                    try {
                        var b = new ActiveXObject("htmlfile");
                        b.write("<body>");
                        b.close();
                        var d = b.body
                    } catch (Db) {
                        d = createPopup().document.body
                    }
                    var k = d.createTextRange();
                    xa = e(function(g) {
                        try {
                            d.style.color = P(g).replace(a, "");
                            var b = k.queryCommandValue("ForeColor");
                            return "#" + ("000000" + ((255 & b) << 16 | 65280 & b | (16711680 & b) >>> 16).toString(16)).slice(-6)
                        } catch (Eb) {
                            return "none"
                        }
                    })
                } else {
                    var l = t.doc.createElement("i");
                    l.title = "Rapha\u00ebl Colour Picker";
                    l.style.display = "none";
                    t.doc.body.appendChild(l);
                    xa = e(function(g) {
                        return l.style.color = g,
                        t.doc.defaultView.getComputedStyle(l, "").getPropertyValue("color")
                    })
                }
                return xa(g)
            }
              , ub = function() {
                return "hsb(" + [this.h, this.s, this.b] + ")"
            }
              , vb = function() {
                return "hsl(" + [this.h, this.s, this.l] + ")"
            }
              , Xa = function() {
                return this.hex
            }
              , Ya = function(g, a, b) {
                if (null == a && c.is(g, "object") && "r"in g && "g"in g && "b"in g && (b = g.b,
                a = g.g,
                g = g.r),
                null == a && c.is(g, "string"))
                    b = c.getRGB(g),
                    g = b.r,
                    a = b.g,
                    b = b.b;
                return (1 < g || 1 < a || 1 < b) && (g /= 255,
                a /= 255,
                b /= 255),
                [g, a, b]
            }
              , Za = function(g, a, b, d) {
                var w = {
                    r: g *= 255,
                    g: a *= 255,
                    b: b *= 255,
                    hex: c.rgb(g, a, b),
                    toString: Xa
                };
                return c.is(d, "finite") && (w.opacity = d),
                w
            };
            c.color = function(g) {
                var a;
                return c.is(g, "object") && "h"in g && "s"in g && "b"in g ? (a = c.hsb2rgb(g),
                g.r = a.r,
                g.g = a.g,
                g.b = a.b,
                g.hex = a.hex) : c.is(g, "object") && "h"in g && "s"in g && "l"in g ? (a = c.hsl2rgb(g),
                g.r = a.r,
                g.g = a.g,
                g.b = a.b,
                g.hex = a.hex) : (c.is(g, "string") && (g = c.getRGB(g)),
                c.is(g, "object") && "r"in g && "g"in g && "b"in g ? (a = c.rgb2hsl(g),
                g.h = a.h,
                g.s = a.s,
                g.l = a.l,
                a = c.rgb2hsb(g),
                g.v = a.b) : (g = {
                    hex: "none"
                }).r = g.g = g.b = g.h = g.s = g.v = g.l = -1),
                g.toString = Xa,
                g
            }
            ;
            c.hsb2rgb = function(g, a, b, c) {
                var w, d, A, e, k;
                return this.is(g, "object") && "h"in g && "s"in g && "b"in g && (b = g.b,
                a = g.s,
                c = g.o,
                g = g.h),
                e = (k = b * a) * (1 - r((g = (g *= 360) % 360 / 60) % 2 - 1)),
                w = d = A = b - k,
                Za(w + [k, e, 0, 0, e, k][g = ~~g], d + [e, k, k, e, 0, 0][g], A + [0, 0, e, k, k, e][g], c)
            }
            ;
            c.hsl2rgb = function(g, a, b, c) {
                var w, d, A, e, k;
                return this.is(g, "object") && "h"in g && "s"in g && "l"in g && (b = g.l,
                a = g.s,
                g = g.h),
                (1 < g || 1 < a || 1 < b) && (g /= 360,
                a /= 100,
                b /= 100),
                e = (k = 2 * a * (.5 > b ? b : 1 - b)) * (1 - r((g = (g *= 360) % 360 / 60) % 2 - 1)),
                w = d = A = b - k / 2,
                Za(w + [k, e, 0, 0, e, k][g = ~~g], d + [e, k, k, e, 0, 0][g], A + [0, 0, e, k, k, e][g], c)
            }
            ;
            c.rgb2hsb = function(g, a, b) {
                var c, w;
                return g = (b = Ya(g, a, b))[0],
                a = b[1],
                b = b[2],
                {
                    h: ((0 == (w = (c = m(g, a, b)) - v(g, a, b)) ? null : c == g ? (a - b) / w : c == a ? (b - g) / w + 2 : (g - a) / w + 4) + 360) % 6 * 60 / 360,
                    s: 0 == w ? 0 : w / c,
                    b: c,
                    toString: ub
                }
            }
            ;
            c.rgb2hsl = function(g, a, b) {
                var c, w, d, e;
                return g = (b = Ya(g, a, b))[0],
                a = b[1],
                b = b[2],
                c = ((w = m(g, a, b)) + (d = v(g, a, b))) / 2,
                {
                    h: ((0 == (e = w - d) ? null : w == g ? (a - b) / e : w == a ? (b - g) / e + 2 : (g - a) / e + 4) + 360) % 6 * 60 / 360,
                    s: 0 == e ? 0 : .5 > c ? e / (2 * c) : e / (2 - 2 * c),
                    l: c,
                    toString: vb
                }
            }
            ;
            c._path2string = function() {
                return this.join(",").replace(rb, "$1")
            }
            ;
            c._preload = function(g, a) {
                var b = t.doc.createElement("img");
                b.style.cssText = "position:absolute;left:-9999em;top:-9999em";
                b.onload = function() {
                    a.call(this);
                    this.onload = null;
                    t.doc.body.removeChild(this)
                }
                ;
                b.onerror = function() {
                    t.doc.body.removeChild(this)
                }
                ;
                t.doc.body.appendChild(b);
                b.src = g
            }
            ;
            c.getRGB = e(function(g) {
                if (!g || (g = P(g)).indexOf("-") + 1)
                    return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: f
                    };
                if ("none" == g)
                    return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        toString: f
                    };
                !qb.hasOwnProperty(g.toLowerCase().substring(0, 2)) && "#" != g.charAt() && (g = xa(g));
                var a, b, d, e, k, l;
                return (g = g.match(ia)) ? (g[2] && (d = ka(g[2].substring(5), 16),
                b = ka(g[2].substring(3, 5), 16),
                a = ka(g[2].substring(1, 3), 16)),
                g[3] && (d = ka((k = g[3].charAt(3)) + k, 16),
                b = ka((k = g[3].charAt(2)) + k, 16),
                a = ka((k = g[3].charAt(1)) + k, 16)),
                g[4] && (l = g[4].split(Fa),
                a = S(l[0]),
                "%" == l[0].slice(-1) && (a *= 2.55),
                b = S(l[1]),
                "%" == l[1].slice(-1) && (b *= 2.55),
                d = S(l[2]),
                "%" == l[2].slice(-1) && (d *= 2.55),
                "rgba" == g[1].toLowerCase().slice(0, 4) && (e = S(l[3])),
                l[3] && "%" == l[3].slice(-1) && (e /= 100)),
                g[5] ? (l = g[5].split(Fa),
                a = S(l[0]),
                "%" == l[0].slice(-1) && (a *= 2.55),
                b = S(l[1]),
                "%" == l[1].slice(-1) && (b *= 2.55),
                d = S(l[2]),
                "%" == l[2].slice(-1) && (d *= 2.55),
                ("deg" == l[0].slice(-3) || "\u00b0" == l[0].slice(-1)) && (a /= 360),
                "hsba" == g[1].toLowerCase().slice(0, 4) && (e = S(l[3])),
                l[3] && "%" == l[3].slice(-1) && (e /= 100),
                c.hsb2rgb(a, b, d, e)) : g[6] ? (l = g[6].split(Fa),
                a = S(l[0]),
                "%" == l[0].slice(-1) && (a *= 2.55),
                b = S(l[1]),
                "%" == l[1].slice(-1) && (b *= 2.55),
                d = S(l[2]),
                "%" == l[2].slice(-1) && (d *= 2.55),
                ("deg" == l[0].slice(-3) || "\u00b0" == l[0].slice(-1)) && (a /= 360),
                "hsla" == g[1].toLowerCase().slice(0, 4) && (e = S(l[3])),
                l[3] && "%" == l[3].slice(-1) && (e /= 100),
                c.hsl2rgb(a, b, d, e)) : ((g = {
                    r: a,
                    g: b,
                    b: d,
                    toString: f
                }).hex = "#" + (16777216 | d | b << 8 | a << 16).toString(16).slice(1),
                c.is(e, "finite") && (g.opacity = e),
                g)) : {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1,
                    toString: f
                }
            }, c);
            c.hsb = e(function(g, a, b) {
                return c.hsb2rgb(g, a, b).hex
            });
            c.hsl = e(function(g, a, b) {
                return c.hsl2rgb(g, a, b).hex
            });
            c.rgb = e(function(g, a, b) {
                return "#" + (b + .5 | 16777216 | (a + .5 | 0) << 8 | (g + .5 | 0) << 16).toString(16).slice(1)
            });
            c.getColor = function(g) {
                g = this.getColor.start = this.getColor.start || {
                    h: 0,
                    s: 1,
                    b: g || .75
                };
                var a = this.hsb2rgb(g.h, g.s, g.b);
                return g.h += .075,
                1 < g.h && (g.h = 0,
                g.s -= .2,
                0 >= g.s && (this.getColor.start = {
                    h: 0,
                    s: 1,
                    b: g.b
                })),
                a.hex
            }
            ;
            c.getColor.reset = function() {
                delete this.start
            }
            ;
            c.parsePathString = function(g) {
                if (!g)
                    return null;
                var a = ma(g);
                if (a.arr)
                    return fa(a.arr);
                var b = {
                    a: 7,
                    c: 6,
                    h: 1,
                    l: 2,
                    m: 2,
                    r: 4,
                    q: 4,
                    s: 4,
                    t: 2,
                    v: 1,
                    z: 0
                }
                  , d = [];
                return c.is(g, Z) && c.is(g[0], Z) && (d = fa(g)),
                d.length || P(g).replace(sb, function(g, a, c) {
                    var w = [];
                    g = a.toLowerCase();
                    if (c.replace(Ta, function(g, a) {
                        a && w.push(+a)
                    }),
                    "m" == g && 2 < w.length && (d.push([a].concat(w.splice(0, 2))),
                    g = "l",
                    a = "m" == a ? "l" : "L"),
                    "r" == g)
                        d.push([a].concat(w));
                    else
                        for (; w.length >= b[g] && (d.push([a].concat(w.splice(0, b[g]))),
                        b[g]); )
                            ;
                }),
                d.toString = c._path2string,
                a.arr = fa(d),
                d
            }
            ;
            c.parseTransformString = e(function(g) {
                if (!g)
                    return null;
                var a = [];
                return c.is(g, Z) && c.is(g[0], Z) && (a = fa(g)),
                a.length || P(g).replace(tb, function(g, b, c) {
                    var d = [];
                    l.call(b);
                    c.replace(Ta, function(g, a) {
                        a && d.push(+a)
                    });
                    a.push([b].concat(d))
                }),
                a.toString = c._path2string,
                a
            }, this, function(g) {
                if (!g)
                    return g;
                for (var a = [], b = 0; b < g.length; b++) {
                    for (var c = [], d = 0; d < g[b].length; d++)
                        c.push(g[b][d]);
                    a.push(c)
                }
                return a
            });
            var ma = function(g) {
                var a = ma.ps = ma.ps || {};
                return a[g] ? a[g].sleep = 100 : a[g] = {
                    sleep: 100
                },
                setTimeout(function() {
                    for (var b in a)
                        a.hasOwnProperty(b) && b != g && (a[b].sleep--,
                        !a[b].sleep && delete a[b])
                }),
                a[g]
            };
            c.findDotsAtSegment = function(a, b, c, d, e, k, l, f, m) {
                var g = 1 - m
                  , w = I(g, 3)
                  , A = I(g, 2)
                  , O = m * m
                  , D = O * m
                  , h = w * a + 3 * A * m * c + 3 * g * m * m * e + D * l;
                w = w * b + 3 * A * m * d + 3 * g * m * m * k + D * f;
                A = a + 2 * m * (c - a) + O * (e - 2 * c + a);
                D = b + 2 * m * (d - b) + O * (k - 2 * d + b);
                var H = c + 2 * m * (e - c) + O * (l - 2 * e + c);
                O = d + 2 * m * (k - d) + O * (f - 2 * k + d);
                a = g * a + m * c;
                b = g * b + m * d;
                e = g * e + m * l;
                k = g * k + m * f;
                f = 90 - 180 * q.atan2(A - H, D - O) / Y;
                return (A > H || D < O) && (f += 180),
                {
                    x: h,
                    y: w,
                    m: {
                        x: A,
                        y: D
                    },
                    n: {
                        x: H,
                        y: O
                    },
                    start: {
                        x: a,
                        y: b
                    },
                    end: {
                        x: e,
                        y: k
                    },
                    alpha: f
                }
            }
            ;
            c.bezierBBox = function(a, b, d, e, k, l, f, q) {
                c.is(a, "array") || (a = [a, b, d, e, k, l, f, q]);
                a = $a.apply(null, a);
                return {
                    x: a.min.x,
                    y: a.min.y,
                    x2: a.max.x,
                    y2: a.max.y,
                    width: a.max.x - a.min.x,
                    height: a.max.y - a.min.y
                }
            }
            ;
            c.isPointInsideBBox = function(a, b, c) {
                return b >= a.x && b <= a.x2 && c >= a.y && c <= a.y2
            }
            ;
            c.isBBoxIntersect = function(a, b) {
                var g = c.isPointInsideBBox;
                return g(b, a.x, a.y) || g(b, a.x2, a.y) || g(b, a.x, a.y2) || g(b, a.x2, a.y2) || g(a, b.x, b.y) || g(a, b.x2, b.y) || g(a, b.x, b.y2) || g(a, b.x2, b.y2) || (a.x < b.x2 && a.x > b.x || b.x < a.x2 && b.x > a.x) && (a.y < b.y2 && a.y > b.y || b.y < a.y2 && b.y > a.y)
            }
            ;
            c.pathIntersection = function(a, b) {
                return G(a, b)
            }
            ;
            c.pathIntersectionNumber = function(a, b) {
                return G(a, b, 1)
            }
            ;
            c.isPointInsidePath = function(a, b, d) {
                var g = c.pathBBox(a);
                return c.isPointInsideBBox(g, b, d) && 1 == G(a, [["M", b, d], ["H", g.x2 + 10]], 1) % 2
            }
            ;
            c._removedFactory = function(g) {
                return function() {
                    a("raphael.log", null, "Rapha\u00ebl: you are calling to method \u201c" + g + "\u201d of removed object", g)
                }
            }
            ;
            var Ja = c.pathBBox = function(a) {
                var g = ma(a);
                if (g.bbox)
                    return d(g.bbox);
                if (!a)
                    return {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                        x2: 0,
                        y2: 0
                    };
                for (var b, c = 0, e = 0, k = [], l = [], f = 0, q = (a = sa(a)).length; f < q; f++)
                    "M" == (b = a[f])[0] ? (c = b[1],
                    e = b[2],
                    k.push(c),
                    l.push(e)) : (c = $a(c, e, b[1], b[2], b[3], b[4], b[5], b[6]),
                    k = k.concat(c.min.x, c.max.x),
                    l = l.concat(c.min.y, c.max.y),
                    c = b[5],
                    e = b[6]);
                a = v[n](0, k);
                b = v[n](0, l);
                k = m[n](0, k);
                l = m[n](0, l);
                f = k - a;
                q = l - b;
                l = {
                    x: a,
                    y: b,
                    x2: k,
                    y2: l,
                    width: f,
                    height: q,
                    cx: a + f / 2,
                    cy: b + q / 2
                };
                return g.bbox = d(l),
                l
            }
              , fa = function(a) {
                a = d(a);
                return a.toString = c._path2string,
                a
            }
              , wb = c._pathToRelative = function(a) {
                var g = ma(a);
                if (g.rel)
                    return fa(g.rel);
                c.is(a, Z) && c.is(a && a[0], Z) || (a = c.parsePathString(a));
                var b = []
                  , d = 0
                  , e = 0
                  , k = 0
                  , f = 0
                  , q = 0;
                "M" == a[0][0] && (k = d = a[0][1],
                f = e = a[0][2],
                q++,
                b.push(["M", d, e]));
                for (var m = a.length; q < m; q++) {
                    var h = b[q] = []
                      , v = a[q];
                    if (v[0] != l.call(v[0]))
                        switch (h[0] = l.call(v[0]),
                        h[0]) {
                        case "a":
                            h[1] = v[1];
                            h[2] = v[2];
                            h[3] = v[3];
                            h[4] = v[4];
                            h[5] = v[5];
                            h[6] = +(v[6] - d).toFixed(3);
                            h[7] = +(v[7] - e).toFixed(3);
                            break;
                        case "v":
                            h[1] = +(v[1] - e).toFixed(3);
                            break;
                        case "m":
                            k = v[1],
                            f = v[2];
                        default:
                            for (var p = 1, r = v.length; p < r; p++)
                                h[p] = +(v[p] - (p % 2 ? d : e)).toFixed(3)
                        }
                    else
                        for (b[q] = [],
                        "m" == v[0] && (k = v[1] + d,
                        f = v[2] + e),
                        h = 0,
                        p = v.length; h < p; h++)
                            b[q][h] = v[h];
                    v = b[q].length;
                    switch (b[q][0]) {
                    case "z":
                        d = k;
                        e = f;
                        break;
                    case "h":
                        d += +b[q][v - 1];
                        break;
                    case "v":
                        e += +b[q][v - 1];
                        break;
                    default:
                        d += +b[q][v - 2],
                        e += +b[q][v - 1]
                    }
                }
                return b.toString = c._path2string,
                g.rel = fa(b),
                b
            }
              , ab = c._pathToAbsolute = function(a) {
                var g = ma(a);
                if (g.abs)
                    return fa(g.abs);
                if (c.is(a, Z) && c.is(a && a[0], Z) || (a = c.parsePathString(a)),
                !a || !a.length)
                    return [["M", 0, 0]];
                var b = []
                  , d = 0
                  , e = 0
                  , k = 0
                  , l = 0
                  , f = 0;
                "M" == a[0][0] && (k = d = +a[0][1],
                l = e = +a[0][2],
                f++,
                b[0] = ["M", d, e]);
                for (var q, m = 3 == a.length && "M" == a[0][0] && "R" == a[1][0].toUpperCase() && "Z" == a[2][0].toUpperCase(), v = f, p = a.length; v < p; v++) {
                    if (b.push(f = []),
                    (q = a[v])[0] != Sa.call(q[0]))
                        switch (f[0] = Sa.call(q[0]),
                        f[0]) {
                        case "A":
                            f[1] = q[1];
                            f[2] = q[2];
                            f[3] = q[3];
                            f[4] = q[4];
                            f[5] = q[5];
                            f[6] = +(q[6] + d);
                            f[7] = +(q[7] + e);
                            break;
                        case "V":
                            f[1] = +q[1] + e;
                            break;
                        case "H":
                            f[1] = +q[1] + d;
                            break;
                        case "R":
                            for (var r = [d, e].concat(q.slice(1)), n = 2, ja = r.length; n < ja; n++)
                                r[n] = +r[n] + d,
                                r[++n] = +r[n] + e;
                            b.pop();
                            b = b.concat(h(r, m));
                            break;
                        case "M":
                            k = +q[1] + d,
                            l = +q[2] + e;
                        default:
                            for (n = 1,
                            ja = q.length; n < ja; n++)
                                f[n] = +q[n] + (n % 2 ? d : e)
                        }
                    else if ("R" == q[0])
                        r = [d, e].concat(q.slice(1)),
                        b.pop(),
                        b = b.concat(h(r, m)),
                        f = ["R"].concat(q.slice(-2));
                    else
                        for (r = 0,
                        n = q.length; r < n; r++)
                            f[r] = q[r];
                    switch (f[0]) {
                    case "Z":
                        d = k;
                        e = l;
                        break;
                    case "H":
                        d = f[1];
                        break;
                    case "V":
                        e = f[1];
                        break;
                    case "M":
                        k = f[f.length - 2],
                        l = f[f.length - 1];
                    default:
                        d = f[f.length - 2],
                        e = f[f.length - 1]
                    }
                }
                return b.toString = c._path2string,
                g.abs = fa(b),
                b
            }
              , ya = function(a, b, c, d) {
                return [a, b, c, d, c, d]
            }
              , bb = function(a, b, c, d, e, k) {
                return [1 / 3 * a + 2 / 3 * c, 1 / 3 * b + 2 / 3 * d, 1 / 3 * e + 2 / 3 * c, 1 / 3 * k + 2 / 3 * d, e, k]
            }
              , cb = function(a, b, c, d, k, l, f, m, h, v) {
                var g = 120 * Y / 180
                  , w = Y / 180 * (+k || 0)
                  , A = []
                  , O = e(function(a, g, b) {
                    return {
                        x: a * q.cos(b) - g * q.sin(b),
                        y: a * q.sin(b) + g * q.cos(b)
                    }
                });
                if (v) {
                    n = v[0];
                    var D = v[1];
                    l = v[2];
                    H = v[3]
                } else {
                    a = (D = O(a, b, -w)).x;
                    b = D.y;
                    m = (D = O(m, h, -w)).x;
                    h = D.y;
                    q.cos(Y / 180 * k);
                    q.sin(Y / 180 * k);
                    D = (a - m) / 2;
                    n = (b - h) / 2;
                    H = D * D / (c * c) + n * n / (d * d);
                    1 < H && (c *= H = q.sqrt(H),
                    d *= H);
                    H = c * c;
                    var p = d * d;
                    H = (l == f ? -1 : 1) * q.sqrt(r((H * p - H * n * n - p * D * D) / (H * n * n + p * D * D)));
                    l = H * c * n / d + (a + m) / 2;
                    var H = H * -d * D / c + (b + h) / 2
                      , n = q.asin(((b - H) / d).toFixed(9));
                    D = q.asin(((h - H) / d).toFixed(9));
                    0 > (n = a < l ? Y - n : n) && (n = 2 * Y + n);
                    0 > (D = m < l ? Y - D : D) && (D = 2 * Y + D);
                    f && n > D && (n -= 2 * Y);
                    !f && D > n && (D -= 2 * Y)
                }
                if (r(D - n) > g) {
                    A = D;
                    p = m;
                    var ua = h;
                    D = n + g * (f && D > n ? 1 : -1);
                    m = l + c * q.cos(D);
                    h = H + d * q.sin(D);
                    A = cb(m, h, c, d, k, 0, f, p, ua, [D, A, l, H])
                }
                l = D - n;
                k = q.cos(n);
                g = q.sin(n);
                f = q.cos(D);
                D = q.sin(D);
                l = q.tan(l / 4);
                c = 4 / 3 * c * l;
                l *= 4 / 3 * d;
                d = [a, b];
                a = [a + c * g, b - l * k];
                b = [m + c * D, h - l * f];
                m = [m, h];
                if (a[0] = 2 * d[0] - a[0],
                a[1] = 2 * d[1] - a[1],
                v)
                    return [a, b, m].concat(A);
                v = [];
                h = 0;
                for (m = (A = [a, b, m].concat(A).join().split(",")).length; h < m; h++)
                    v[h] = h % 2 ? O(A[h - 1], A[h], w).y : O(A[h], A[h + 1], w).x;
                return v
            }
              , za = function(a, b, c, d, e, k, l, f, q) {
                var g = 1 - q;
                return {
                    x: I(g, 3) * a + 3 * I(g, 2) * q * c + 3 * g * q * q * e + I(q, 3) * l,
                    y: I(g, 3) * b + 3 * I(g, 2) * q * d + 3 * g * q * q * k + I(q, 3) * f
                }
            }
              , $a = e(function(a, b, c, d, e, k, l, f) {
                var g, w = e - 2 * c + a - (l - 2 * e + c), A = 2 * (c - a) - 2 * (e - c), h = a - c, O = (-A + q.sqrt(A * A - 4 * w * h)) / 2 / w, D = (-A - q.sqrt(A * A - 4 * w * h)) / 2 / w, p = [b, f], H = [a, l];
                return "1e12" < r(O) && (O = .5),
                "1e12" < r(D) && (D = .5),
                0 < O && 1 > O && (g = za(a, b, c, d, e, k, l, f, O),
                H.push(g.x),
                p.push(g.y)),
                0 < D && 1 > D && (g = za(a, b, c, d, e, k, l, f, D),
                H.push(g.x),
                p.push(g.y)),
                w = k - 2 * d + b - (f - 2 * k + d),
                h = b - d,
                O = (-(A = 2 * (d - b) - 2 * (k - d)) + q.sqrt(A * A - 4 * w * h)) / 2 / w,
                D = (-A - q.sqrt(A * A - 4 * w * h)) / 2 / w,
                "1e12" < r(O) && (O = .5),
                "1e12" < r(D) && (D = .5),
                0 < O && 1 > O && (g = za(a, b, c, d, e, k, l, f, O),
                H.push(g.x),
                p.push(g.y)),
                0 < D && 1 > D && (g = za(a, b, c, d, e, k, l, f, D),
                H.push(g.x),
                p.push(g.y)),
                {
                    min: {
                        x: v[n](0, H),
                        y: v[n](0, p)
                    },
                    max: {
                        x: m[n](0, H),
                        y: m[n](0, p)
                    }
                }
            })
              , sa = c._path2curve = e(function(a, b) {
                var g = !b && ma(a);
                if (!b && g.curve)
                    return fa(g.curve);
                var c = ab(a)
                  , d = b && ab(b);
                a = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                };
                b = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                };
                var e = function(a, b, g) {
                    var c, d;
                    if (!a)
                        return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
                    switch (!(a[0]in {
                        T: 1,
                        Q: 1
                    }) && (b.qx = b.qy = null),
                    a[0]) {
                    case "M":
                        b.X = a[1];
                        b.Y = a[2];
                        break;
                    case "A":
                        a = ["C"].concat(cb[n](0, [b.x, b.y].concat(a.slice(1))));
                        break;
                    case "S":
                        "C" == g || "S" == g ? (c = 2 * b.x - b.bx,
                        d = 2 * b.y - b.by) : (c = b.x,
                        d = b.y);
                        a = ["C", c, d].concat(a.slice(1));
                        break;
                    case "T":
                        "Q" == g || "T" == g ? (b.qx = 2 * b.x - b.qx,
                        b.qy = 2 * b.y - b.qy) : (b.qx = b.x,
                        b.qy = b.y);
                        a = ["C"].concat(bb(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                        break;
                    case "Q":
                        b.qx = a[1];
                        b.qy = a[2];
                        a = ["C"].concat(bb(b.x, b.y, a[1], a[2], a[3], a[4]));
                        break;
                    case "L":
                        a = ["C"].concat(ya(b.x, b.y, a[1], a[2]));
                        break;
                    case "H":
                        a = ["C"].concat(ya(b.x, b.y, a[1], b.y));
                        break;
                    case "V":
                        a = ["C"].concat(ya(b.x, b.y, b.x, a[1]));
                        break;
                    case "Z":
                        a = ["C"].concat(ya(b.x, b.y, b.X, b.Y))
                    }
                    return a
                }
                  , k = function(a, b) {
                    if (7 < a[b].length) {
                        a[b].shift();
                        for (var g = a[b]; g.length; )
                            l[b] = "A",
                            d && (f[b] = "A"),
                            a.splice(b++, 0, ["C"].concat(g.splice(0, 6)));
                        a.splice(b, 1);
                        p = m(c.length, d && d.length || 0)
                    }
                }
                  , w = function(a, b, g, e, k) {
                    a && b && "M" == a[k][0] && "M" != b[k][0] && (b.splice(k, 0, ["M", e.x, e.y]),
                    g.bx = 0,
                    g.by = 0,
                    g.x = a[k][1],
                    g.y = a[k][2],
                    p = m(c.length, d && d.length || 0))
                }
                  , l = []
                  , f = []
                  , q = ""
                  , h = ""
                  , v = 0
                  , p = m(c.length, d && d.length || 0);
                for (; v < p; v++) {
                    c[v] && (q = c[v][0]);
                    "C" != q && (l[v] = q,
                    v && (h = l[v - 1]));
                    c[v] = e(c[v], a, h);
                    "A" != l[v] && "C" == q && (l[v] = "C");
                    k(c, v);
                    d && (d[v] && (q = d[v][0]),
                    "C" != q && (f[v] = q,
                    v && (h = f[v - 1])),
                    d[v] = e(d[v], b, h),
                    "A" != f[v] && "C" == q && (f[v] = "C"),
                    k(d, v));
                    w(c, d, a, b, v);
                    w(d, c, b, a, v);
                    var r = c[v]
                      , I = d && d[v]
                      , u = r.length
                      , t = d && I.length;
                    a.x = r[u - 2];
                    a.y = r[u - 1];
                    a.bx = S(r[u - 4]) || a.x;
                    a.by = S(r[u - 3]) || a.y;
                    b.bx = d && (S(I[t - 4]) || b.x);
                    b.by = d && (S(I[t - 3]) || b.y);
                    b.x = d && I[t - 2];
                    b.y = d && I[t - 1]
                }
                return d || (g.curve = fa(c)),
                d ? [c, d] : c
            }, null, fa)
              , Aa = (c._parseDots = e(function(a) {
                for (var b = [], g = 0, d = a.length; g < d; g++) {
                    var e = {}
                      , k = a[g].match(/^([^:]*):?([\d\.]*)/);
                    if (e.color = c.getRGB(k[1]),
                    e.color.error)
                        return null;
                    e.opacity = e.color.opacity;
                    e.color = e.color.hex;
                    k[2] && (e.offset = k[2] + "%");
                    b.push(e)
                }
                g = 1;
                for (d = b.length - 1; g < d; g++)
                    if (!b[g].offset) {
                        a = S(b[g - 1].offset || 0);
                        k = 0;
                        for (e = g + 1; e < d; e++)
                            if (b[e].offset) {
                                k = b[e].offset;
                                break
                            }
                        k || (k = 100,
                        e = d);
                        for (k = (S(k) - a) / (e - g + 1); g < e; g++)
                            a += k,
                            b[g].offset = a + "%"
                    }
                return b
            }),
            c._tear = function(a, b) {
                a == b.top && (b.top = a.prev);
                a == b.bottom && (b.bottom = a.next);
                a.next && (a.next.prev = a.prev);
                a.prev && (a.prev.next = a.next)
            }
            )
              , xb = (c._tofront = function(a, b) {
                b.top !== a && (Aa(a, b),
                a.next = null,
                a.prev = b.top,
                b.top.next = a,
                b.top = a)
            }
            ,
            c._toback = function(a, b) {
                b.bottom !== a && (Aa(a, b),
                a.next = b.bottom,
                a.prev = null,
                b.bottom.prev = a,
                b.bottom = a)
            }
            ,
            c._insertafter = function(a, b, c) {
                Aa(a, c);
                b == c.top && (c.top = a);
                b.next && (b.next.prev = a);
                a.next = b.next;
                a.prev = b;
                b.next = a
            }
            ,
            c._insertbefore = function(a, b, c) {
                Aa(a, c);
                b == c.bottom && (c.bottom = a);
                b.prev && (b.prev.next = a);
                a.prev = b.prev;
                b.prev = a;
                a.next = b
            }
            ,
            c.toMatrix = function(a, b) {
                var g = Ja(a);
                a = {
                    _: {
                        transform: ""
                    },
                    getBBox: function() {
                        return g
                    }
                };
                return Qa(a, b),
                a.matrix
            }
            )
              , Qa = (c.transformPath = function(a, b) {
                return Ga(a, xb(a, b))
            }
            ,
            c._extractTransform = function(a, b) {
                if (null == b)
                    return a._.transform;
                b = P(b).replace(/\.{3}|\u2026/g, a._.transform || "");
                var g = c.parseTransformString(b);
                b = 0;
                var d = 1
                  , e = 1
                  , k = a._;
                var l = new y;
                if (k.transform = g || [],
                g)
                    for (var f = 0, w = g.length; f < w; f++) {
                        var q, m, h, v, p, r = g[f], n = r.length, I = P(r[0]).toLowerCase(), u = r[0] != I, t = u ? l.invert() : 0;
                        "t" == I && 3 == n ? u ? (q = t.x(0, 0),
                        m = t.y(0, 0),
                        h = t.x(r[1], r[2]),
                        v = t.y(r[1], r[2]),
                        l.translate(h - q, v - m)) : l.translate(r[1], r[2]) : "r" == I ? 2 == n ? (p = p || a.getBBox(1),
                        l.rotate(r[1], p.x + p.width / 2, p.y + p.height / 2),
                        b += r[1]) : 4 == n && (u ? (h = t.x(r[2], r[3]),
                        v = t.y(r[2], r[3]),
                        l.rotate(r[1], h, v)) : l.rotate(r[1], r[2], r[3]),
                        b += r[1]) : "s" == I ? 2 == n || 3 == n ? (p = p || a.getBBox(1),
                        l.scale(r[1], r[n - 1], p.x + p.width / 2, p.y + p.height / 2),
                        d *= r[1],
                        e *= r[n - 1]) : 5 == n && (u ? (h = t.x(r[3], r[4]),
                        v = t.y(r[3], r[4]),
                        l.scale(r[1], r[2], h, v)) : l.scale(r[1], r[2], r[3], r[4]),
                        d *= r[1],
                        e *= r[2]) : "m" == I && 7 == n && l.add(r[1], r[2], r[3], r[4], r[5], r[6]);
                        k.dirtyT = 1;
                        a.matrix = l
                    }
                a.matrix = l;
                k.sx = d;
                k.sy = e;
                k.deg = b;
                k.dx = a = l.e;
                k.dy = l = l.f;
                1 == d && 1 == e && !b && k.bbox ? (k.bbox.x += +a,
                k.bbox.y += +l) : k.dirtyT = 1
            }
            )
              , db = function(a) {
                var b = a[0];
                switch (b.toLowerCase()) {
                case "t":
                    return [b, 0, 0];
                case "m":
                    return [b, 1, 0, 0, 1, 0, 0];
                case "r":
                    return 4 == a.length ? [b, 0, a[2], a[3]] : [b, 0];
                case "s":
                    return 5 == a.length ? [b, 1, 1, a[3], a[4]] : 3 == a.length ? [b, 1, 1] : [b, 1]
                }
            }
              , nb = c._equaliseTransform = function(a, b) {
                b = P(b).replace(/\.{3}|\u2026/g, a);
                a = c.parseTransformString(a) || [];
                b = c.parseTransformString(b) || [];
                for (var g, d, e, k, l = m(a.length, b.length), f = [], q = [], w = 0; w < l; w++) {
                    if (e = a[w] || db(b[w]),
                    k = b[w] || db(e),
                    e[0] != k[0] || "r" == e[0].toLowerCase() && (e[2] != k[2] || e[3] != k[3]) || "s" == e[0].toLowerCase() && (e[3] != k[3] || e[4] != k[4]))
                        return;
                    f[w] = [];
                    q[w] = [];
                    g = 0;
                    for (d = m(e.length, k.length); g < d; g++)
                        g in e && (f[w][g] = e[g]),
                        g in k && (q[w][g] = k[g])
                }
                return {
                    from: f,
                    to: q
                }
            }
            ;
            c._getContainer = function(a, b, d, e) {
                var g;
                if (null != (g = null != e || c.is(a, "object") ? a : t.doc.getElementById(a)))
                    return g.tagName ? null == b ? {
                        container: g,
                        width: g.style.pixelWidth || g.offsetWidth,
                        height: g.style.pixelHeight || g.offsetHeight
                    } : {
                        container: g,
                        width: b,
                        height: d
                    } : {
                        container: 1,
                        x: a,
                        y: b,
                        width: d,
                        height: e
                    }
            }
            ;
            c.pathToRelative = wb;
            c._engine = {};
            c.path2curve = sa;
            c.matrix = function(a, b, c, d, e, k) {
                return new y(a,b,c,d,e,k)
            }
            ;
            (function(a) {
                function b(a) {
                    return a[0] * a[0] + a[1] * a[1]
                }
                function g(a) {
                    var g = q.sqrt(b(a));
                    a[0] && (a[0] /= g);
                    a[1] && (a[1] /= g)
                }
                a.add = function(a, b, g, c, d, e) {
                    var k = [[], [], []]
                      , l = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]];
                    b = [[a, g, d], [b, c, e], [0, 0, 1]];
                    a && a instanceof y && (b = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]]);
                    for (a = 0; 3 > a; a++)
                        for (g = 0; 3 > g; g++) {
                            for (c = d = 0; 3 > c; c++)
                                d += l[a][c] * b[c][g];
                            k[a][g] = d
                        }
                    this.a = k[0][0];
                    this.b = k[1][0];
                    this.c = k[0][1];
                    this.d = k[1][1];
                    this.e = k[0][2];
                    this.f = k[1][2]
                }
                ;
                a.invert = function() {
                    var a = this.a * this.d - this.b * this.c;
                    return new y(this.d / a,-this.b / a,-this.c / a,this.a / a,(this.c * this.f - this.d * this.e) / a,(this.b * this.e - this.a * this.f) / a)
                }
                ;
                a.clone = function() {
                    return new y(this.a,this.b,this.c,this.d,this.e,this.f)
                }
                ;
                a.translate = function(a, b) {
                    this.add(1, 0, 0, 1, a, b)
                }
                ;
                a.scale = function(a, b, g, c) {
                    null == b && (b = a);
                    (g || c) && this.add(1, 0, 0, 1, g, c);
                    this.add(a, 0, 0, b, 0, 0);
                    (g || c) && this.add(1, 0, 0, 1, -g, -c)
                }
                ;
                a.rotate = function(a, b, g) {
                    a = c.rad(a);
                    b = b || 0;
                    g = g || 0;
                    var d = +q.cos(a).toFixed(9);
                    a = +q.sin(a).toFixed(9);
                    this.add(d, a, -a, d, b, g);
                    this.add(1, 0, 0, 1, -b, -g)
                }
                ;
                a.x = function(a, b) {
                    return a * this.a + b * this.c + this.e
                }
                ;
                a.y = function(a, b) {
                    return a * this.b + b * this.d + this.f
                }
                ;
                a.get = function(a) {
                    return +this[P.fromCharCode(97 + a)].toFixed(4)
                }
                ;
                a.toString = function() {
                    return c.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
                }
                ;
                a.toFilter = function() {
                    return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
                }
                ;
                a.offset = function() {
                    return [this.e.toFixed(4), this.f.toFixed(4)]
                }
                ;
                a.split = function() {
                    var a = {};
                    a.dx = this.e;
                    a.dy = this.f;
                    var d = [[this.a, this.c], [this.b, this.d]];
                    a.scalex = q.sqrt(b(d[0]));
                    g(d[0]);
                    a.shear = d[0][0] * d[1][0] + d[0][1] * d[1][1];
                    d[1] = [d[1][0] - d[0][0] * a.shear, d[1][1] - d[0][1] * a.shear];
                    a.scaley = q.sqrt(b(d[1]));
                    g(d[1]);
                    a.shear /= a.scaley;
                    var e = -d[0][1];
                    d = d[1][1];
                    return 0 > d ? (a.rotate = c.deg(q.acos(d)),
                    0 > e && (a.rotate = 360 - a.rotate)) : a.rotate = c.deg(q.asin(e)),
                    a.isSimple = !(+a.shear.toFixed(9) || a.scalex.toFixed(9) != a.scaley.toFixed(9) && a.rotate),
                    a.isSuperSimple = !+a.shear.toFixed(9) && a.scalex.toFixed(9) == a.scaley.toFixed(9) && !a.rotate,
                    a.noRotation = !+a.shear.toFixed(9) && !a.rotate,
                    a
                }
                ;
                a.toTransformString = function(a) {
                    a = a || this.split();
                    return a.isSimple ? (a.scalex = +a.scalex.toFixed(4),
                    a.scaley = +a.scaley.toFixed(4),
                    a.rotate = +a.rotate.toFixed(4),
                    (a.dx || a.dy ? "t" + [a.dx, a.dy] : "") + (1 != a.scalex || 1 != a.scaley ? "s" + [a.scalex, a.scaley, 0, 0] : "") + (a.rotate ? "r" + [a.rotate, 0, 0] : "")) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
                }
            }
            )(y.prototype);
            for (var yb = function() {
                this.returnValue = !1
            }, zb = function() {
                return this.originalEvent.preventDefault()
            }, Ab = function() {
                this.cancelBubble = !0
            }, Bb = function() {
                return this.originalEvent.stopPropagation()
            }, eb = function(a) {
                return {
                    x: a.clientX + (t.doc.documentElement.scrollLeft || t.doc.body.scrollLeft),
                    y: a.clientY + (t.doc.documentElement.scrollTop || t.doc.body.scrollTop)
                }
            }, Cb = t.doc.addEventListener ? function(a, b, c, d) {
                var g = function(a) {
                    var b = eb(a);
                    return c.call(d, a, b.x, b.y)
                };
                if (a.addEventListener(b, g, !1),
                ha && k[b]) {
                    var e = function(b) {
                        for (var g = eb(b), e = b, k = 0, l = b.targetTouches && b.targetTouches.length; k < l; k++)
                            if (b.targetTouches[k].target == a) {
                                (b = b.targetTouches[k]).originalEvent = e;
                                b.preventDefault = zb;
                                b.stopPropagation = Bb;
                                break
                            }
                        return c.call(d, b, g.x, g.y)
                    };
                    a.addEventListener(k[b], e, !1)
                }
                return function() {
                    return a.removeEventListener(b, g, !1),
                    ha && k[b] && a.removeEventListener(k[b], e, !1),
                    !0
                }
            }
            : t.doc.attachEvent ? function(a, b, c, d) {
                var g = function(a) {
                    a = a || t.win.event;
                    var b = a.clientX + (t.doc.documentElement.scrollLeft || t.doc.body.scrollLeft)
                      , g = a.clientY + (t.doc.documentElement.scrollTop || t.doc.body.scrollTop);
                    return a.preventDefault = a.preventDefault || yb,
                    a.stopPropagation = a.stopPropagation || Ab,
                    c.call(d, a, b, g)
                };
                return a.attachEvent("on" + b, g),
                function() {
                    return a.detachEvent("on" + b, g),
                    !0
                }
            }
            : void 0, la = [], Ka = function(b) {
                for (var g, c = b.clientX, d = b.clientY, e = t.doc.documentElement.scrollTop || t.doc.body.scrollTop, k = t.doc.documentElement.scrollLeft || t.doc.body.scrollLeft, l = la.length; l--; ) {
                    if (g = la[l],
                    ha && b.touches)
                        for (var f, q = b.touches.length; q--; ) {
                            if ((f = b.touches[q]).identifier == g.el._drag.id) {
                                c = f.clientX;
                                d = f.clientY;
                                (b.originalEvent ? b.originalEvent : b).preventDefault();
                                break
                            }
                        }
                    else
                        b.preventDefault();
                    q = g.el.node;
                    var m = q.nextSibling
                      , h = q.parentNode
                      , v = q.style.display;
                    t.win.opera && h.removeChild(q);
                    q.style.display = "none";
                    f = g.el.paper.getElementByPoint(c, d);
                    q.style.display = v;
                    t.win.opera && (m ? h.insertBefore(q, m) : h.appendChild(q));
                    f && a("raphael.drag.over." + g.el.id, g.el, f);
                    c += k;
                    d += e;
                    a("raphael.drag.move." + g.el.id, g.move_scope || g.el, c - g.el._drag.x, d - g.el._drag.y, c, d, b)
                }
            }, La = function(b) {
                c.unmousemove(Ka).unmouseup(La);
                for (var g, d = la.length; d--; )
                    (g = la[d]).el._drag = {},
                    a("raphael.drag.end." + g.el.id, g.end_scope || g.start_scope || g.move_scope || g.el, b);
                la = []
            }, L = c.el = {}, fb = b.length; fb--; )
                !function(a) {
                    c[a] = L[a] = function(b, g) {
                        return c.is(b, "function") && (this.events = this.events || [],
                        this.events.push({
                            name: a,
                            f: b,
                            unbind: Cb(this.shape || this.node || t.doc, a, b, g || this)
                        })),
                        this
                    }
                    ;
                    c["un" + a] = L["un" + a] = function(b) {
                        for (var g = this.events || [], d = g.length; d--; )
                            g[d].name != a || !c.is(b, "undefined") && g[d].f != b || (g[d].unbind(),
                            g.splice(d, 1),
                            !g.length && delete this.events);
                        return this
                    }
                }(b[fb]);
            L.data = function(b, d) {
                var g = qa[this.id] = qa[this.id] || {};
                if (0 == arguments.length)
                    return g;
                if (1 == arguments.length) {
                    if (c.is(b, "object")) {
                        for (var e in b)
                            b.hasOwnProperty(e) && this.data(e, b[e]);
                        return this
                    }
                    return a("raphael.data.get." + this.id, this, g[b], b),
                    g[b]
                }
                return g[b] = d,
                a("raphael.data.set." + this.id, this, d, b),
                this
            }
            ;
            L.removeData = function(a) {
                return null == a ? delete qa[this.id] : qa[this.id] && delete qa[this.id][a],
                this
            }
            ;
            L.getData = function() {
                return d(qa[this.id] || {})
            }
            ;
            L.hover = function(a, b, c, d) {
                return this.mouseover(a, c).mouseout(b, d || c)
            }
            ;
            L.unhover = function(a, b) {
                return this.unmouseover(a).unmouseout(b)
            }
            ;
            var ra = [];
            L.drag = function(b, d, e, k, l, f) {
                function g(g) {
                    (g.originalEvent || g).preventDefault();
                    var q = g.clientX
                      , m = g.clientY
                      , w = t.doc.documentElement.scrollTop || t.doc.body.scrollTop
                      , h = t.doc.documentElement.scrollLeft || t.doc.body.scrollLeft;
                    if (this._drag.id = g.identifier,
                    ha && g.touches)
                        for (var v, A = g.touches.length; A--; )
                            if (v = g.touches[A],
                            this._drag.id = v.identifier,
                            v.identifier == this._drag.id) {
                                q = v.clientX;
                                m = v.clientY;
                                break
                            }
                    this._drag.x = q + h;
                    this._drag.y = m + w;
                    !la.length && c.mousemove(Ka).mouseup(La);
                    la.push({
                        el: this,
                        move_scope: k,
                        start_scope: l,
                        end_scope: f
                    });
                    d && a.on("raphael.drag.start." + this.id, d);
                    b && a.on("raphael.drag.move." + this.id, b);
                    e && a.on("raphael.drag.end." + this.id, e);
                    a("raphael.drag.start." + this.id, l || k || this, this._drag.x, this._drag.y, g)
                }
                return this._drag = {},
                ra.push({
                    el: this,
                    start: g
                }),
                this.mousedown(g),
                this
            }
            ;
            L.onDragOver = function(b) {
                b ? a.on("raphael.drag.over." + this.id, b) : a.unbind("raphael.drag.over." + this.id)
            }
            ;
            L.undrag = function() {
                for (var b = ra.length; b--; )
                    ra[b].el == this && (this.unmousedown(ra[b].start),
                    ra.splice(b, 1),
                    a.unbind("raphael.drag.*." + this.id));
                !ra.length && c.unmousemove(Ka).unmouseup(La);
                la = []
            }
            ;
            C.circle = function(a, b, d) {
                a = c._engine.circle(this, a || 0, b || 0, d || 0);
                return this.__set__ && this.__set__.push(a),
                a
            }
            ;
            C.rect = function(a, b, d, e, k) {
                a = c._engine.rect(this, a || 0, b || 0, d || 0, e || 0, k || 0);
                return this.__set__ && this.__set__.push(a),
                a
            }
            ;
            C.ellipse = function(a, b, d, e) {
                a = c._engine.ellipse(this, a || 0, b || 0, d || 0, e || 0);
                return this.__set__ && this.__set__.push(a),
                a
            }
            ;
            C.path = function(a) {
                a && !c.is(a, "string") && !c.is(a[0], Z) && (a += "");
                var b = c._engine.path(c.format[n](c, arguments), this);
                return this.__set__ && this.__set__.push(b),
                b
            }
            ;
            C.image = function(a, b, d, e, k) {
                a = c._engine.image(this, a || "about:blank", b || 0, d || 0, e || 0, k || 0);
                return this.__set__ && this.__set__.push(a),
                a
            }
            ;
            C.text = function(a, b, d) {
                a = c._engine.text(this, a || 0, b || 0, P(d));
                return this.__set__ && this.__set__.push(a),
                a
            }
            ;
            C.set = function(a) {
                !c.is(a, "array") && (a = Array.prototype.splice.call(arguments, 0, arguments.length));
                var b = new ta(a);
                return this.__set__ && this.__set__.push(b),
                b.paper = this,
                b.type = "set",
                b
            }
            ;
            C.setStart = function(a) {
                this.__set__ = a || this.set()
            }
            ;
            C.setFinish = function(a) {
                a = this.__set__;
                return delete this.__set__,
                a
            }
            ;
            C.getSize = function() {
                var a = this.canvas.parentNode;
                return {
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            }
            ;
            C.setSize = function(a, b) {
                return c._engine.setSize.call(this, a, b)
            }
            ;
            C.setViewBox = function(a, b, d, e, k) {
                return c._engine.setViewBox.call(this, a, b, d, e, k)
            }
            ;
            C.top = C.bottom = null;
            C.raphael = c;
            C.getElementByPoint = function(a, b) {
                var g, d, c, e, k, l, f = this.canvas, q = t.doc.elementFromPoint(a, b);
                if (t.win.opera && "svg" == q.tagName) {
                    var m = (g = f.getBoundingClientRect(),
                    d = f.ownerDocument,
                    c = d.body,
                    e = d.documentElement,
                    k = e.clientTop || c.clientTop || 0,
                    l = e.clientLeft || c.clientLeft || 0,
                    {
                        y: g.top + (t.win.pageYOffset || e.scrollTop || c.scrollTop) - k,
                        x: g.left + (t.win.pageXOffset || e.scrollLeft || c.scrollLeft) - l
                    });
                    g = f.createSVGRect();
                    g.x = a - m.x;
                    g.y = b - m.y;
                    g.width = g.height = 1;
                    a = f.getIntersectionList(g, null);
                    a.length && (q = a[a.length - 1])
                }
                if (!q)
                    return null;
                for (; q.parentNode && q != f.parentNode && !q.raphael; )
                    q = q.parentNode;
                return q == this.canvas.parentNode && (q = f),
                q && q.raphael ? this.getById(q.raphaelid) : null
            }
            ;
            C.getElementsByBBox = function(a) {
                var b = this.set();
                return this.forEach(function(g) {
                    c.isBBoxIntersect(g.getBBox(), a) && b.push(g)
                }),
                b
            }
            ;
            C.getById = function(a) {
                for (var b = this.bottom; b; ) {
                    if (b.id == a)
                        return b;
                    b = b.next
                }
                return null
            }
            ;
            C.forEach = function(a, b) {
                for (var g = this.bottom; g && !1 !== a.call(b, g); )
                    g = g.next;
                return this
            }
            ;
            C.getElementsByPoint = function(a, b) {
                var g = this.set();
                return this.forEach(function(c) {
                    c.isPointInside(a, b) && g.push(c)
                }),
                g
            }
            ;
            L.isPointInside = function(a, b) {
                var g = this.realPath = wa[this.type](this);
                return this.attr("transform") && this.attr("transform").length && (g = c.transformPath(g, this.attr("transform"))),
                c.isPointInsidePath(g, a, b)
            }
            ;
            L.getBBox = function(a) {
                if (this.removed)
                    return {};
                var b = this._;
                return a ? (!b.dirty && b.bboxwt || (this.realPath = wa[this.type](this),
                b.bboxwt = Ja(this.realPath),
                b.bboxwt.toString = T,
                b.dirty = 0),
                b.bboxwt) : ((b.dirty || b.dirtyT || !b.bbox) && (!b.dirty && this.realPath || (b.bboxwt = 0,
                this.realPath = wa[this.type](this)),
                b.bbox = Ja(Ga(this.realPath, this.matrix)),
                b.bbox.toString = T,
                b.dirty = b.dirtyT = 0),
                b.bbox)
            }
            ;
            L.clone = function() {
                if (this.removed)
                    return null;
                var a = this.paper[this.type]().attr(this.attr());
                return this.__set__ && this.__set__.push(a),
                a
            }
            ;
            L.glow = function(a) {
                if ("text" == this.type)
                    return null;
                var b = ((a = a || {}).width || 10) + (+this.attr("stroke-width") || 1)
                  , g = a.fill || !1
                  , c = null == a.opacity ? .5 : a.opacity
                  , d = a.offsetx || 0
                  , e = a.offsety || 0;
                a = a.color || "#000";
                var k = b / 2
                  , l = this.paper
                  , f = l.set()
                  , q = this.realPath || wa[this.type](this);
                q = this.matrix ? Ga(q, this.matrix) : q;
                for (var m = 1; m < k + 1; m++)
                    f.push(l.path(q).attr({
                        stroke: a,
                        fill: g ? a : "none",
                        "stroke-linejoin": "round",
                        "stroke-linecap": "round",
                        "stroke-width": +(b / k * m).toFixed(3),
                        opacity: +(c / k).toFixed(3)
                    }));
                return f.insertBefore(this).translate(d, e)
            }
            ;
            var Ma = function(a, b, d, e, k, l, f, q, m) {
                return null == m ? F(a, b, d, e, k, l, f, q) : c.findDotsAtSegment(a, b, d, e, k, l, f, q, function(a, b, g, d, c, e, k, l, f) {
                    if (!(0 > f || F(a, b, g, d, c, e, k, l) < f)) {
                        var q, m = .5, h = 1 - m;
                        for (q = F(a, b, g, d, c, e, k, l, h); .01 < r(q - f); )
                            q = F(a, b, g, d, c, e, k, l, h += (q < f ? 1 : -1) * (m /= 2));
                        return h
                    }
                }(a, b, d, e, k, l, f, q, m))
            }
              , Na = function(a, b) {
                return function(g, d, e) {
                    for (var k, l, f, q, m, h = "", v = {}, w = 0, p = 0, A = (g = sa(g)).length; p < A; p++) {
                        if ("M" == (f = g[p])[0])
                            k = +f[1],
                            l = +f[2];
                        else {
                            if (w + (q = Ma(k, l, f[1], f[2], f[3], f[4], f[5], f[6])) > d) {
                                if (b && !v.start) {
                                    if (h += ["C" + (m = Ma(k, l, f[1], f[2], f[3], f[4], f[5], f[6], d - w)).start.x, m.start.y, m.m.x, m.m.y, m.x, m.y],
                                    e)
                                        return h;
                                    v.start = h;
                                    h = ["M" + m.x, m.y + "C" + m.n.x, m.n.y, m.end.x, m.end.y, f[5], f[6]].join();
                                    w += q;
                                    k = +f[5];
                                    l = +f[6];
                                    continue
                                }
                                if (!a && !b)
                                    return {
                                        x: (m = Ma(k, l, f[1], f[2], f[3], f[4], f[5], f[6], d - w)).x,
                                        y: m.y,
                                        alpha: m.alpha
                                    }
                            }
                            w += q;
                            k = +f[5];
                            l = +f[6]
                        }
                        h += f.shift() + f
                    }
                    return v.end = h,
                    (m = a ? w : b ? v : c.findDotsAtSegment(k, l, f[0], f[1], f[2], f[3], f[4], f[5], 1)).alpha && (m = {
                        x: m.x,
                        y: m.y,
                        alpha: m.alpha
                    }),
                    m
                }
            }
              , gb = Na(1)
              , hb = Na()
              , Oa = Na(0, 1);
            c.getTotalLength = gb;
            c.getPointAtLength = hb;
            c.getSubpath = function(a, b, d) {
                if (1E-6 > this.getTotalLength(a) - d)
                    return Oa(a, b).end;
                a = Oa(a, d, 1);
                return b ? Oa(a, b).end : a
            }
            ;
            L.getTotalLength = function() {
                var a = this.getPath();
                if (a)
                    return this.node.getTotalLength ? this.node.getTotalLength() : gb(a)
            }
            ;
            L.getPointAtLength = function(a) {
                var b = this.getPath();
                if (b)
                    return hb(b, a)
            }
            ;
            L.getPath = function() {
                var a, b = c._getPath[this.type];
                if ("text" != this.type && "set" != this.type)
                    return b && (a = b(this)),
                    a
            }
            ;
            L.getSubpath = function(a, b) {
                var g = this.getPath();
                if (g)
                    return c.getSubpath(g, a, b)
            }
            ;
            var da = c.easing_formulas = {
                linear: function(a) {
                    return a
                },
                "<": function(a) {
                    return I(a, 1.7)
                },
                ">": function(a) {
                    return I(a, .48)
                },
                "<>": function(a) {
                    var b = .48 - a / 1.04
                      , d = q.sqrt(.1734 + b * b);
                    a = d - b;
                    b = -d - b;
                    a = I(r(a), 1 / 3) * (0 > a ? -1 : 1) + I(r(b), 1 / 3) * (0 > b ? -1 : 1) + .5;
                    return 3 * (1 - a) * a * a + a * a * a
                },
                backIn: function(a) {
                    return a * a * (2.70158 * a - 1.70158)
                },
                backOut: function(a) {
                    return --a * a * (2.70158 * a + 1.70158) + 1
                },
                elastic: function(a) {
                    return a == !!a ? a : I(2, -10 * a) * q.sin(2 * Y * (a - .075) / .3) + 1
                },
                bounce: function(a) {
                    return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                }
            };
            da.easeIn = da["ease-in"] = da["<"];
            da.easeOut = da["ease-out"] = da[">"];
            da.easeInOut = da["ease-in-out"] = da["<>"];
            da["back-in"] = da.backIn;
            da["back-out"] = da.backOut;
            var J = []
              , Ra = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                setTimeout(a, 16)
            }
              , Da = function() {
                for (var b = +new Date, d = 0; d < J.length; d++) {
                    var e = J[d];
                    if (!e.el.removed && !e.paused) {
                        var k, l = b - e.start, f = e.ms, q = e.easing, m = e.from, h = e.diff, v = e.to, r = (e.t,
                        e.el), n = {}, I = {};
                        if (e.initstatus ? (l = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * f,
                        e.status = e.initstatus,
                        delete e.initstatus,
                        e.stop && J.splice(d--, 1)) : e.status = (e.prev + l / f * (e.percent - e.prev)) / e.anim.top,
                        !(0 > l))
                            if (l < f) {
                                var u = q(l / f), t;
                                for (t in m)
                                    if (m.hasOwnProperty(t)) {
                                        switch (Ca[t]) {
                                        case R:
                                            var x = +m[t] + u * f * h[t];
                                            break;
                                        case "colour":
                                            x = "rgb(" + [Pa(Ea(m[t].r + u * f * h[t].r)), Pa(Ea(m[t].g + u * f * h[t].g)), Pa(Ea(m[t].b + u * f * h[t].b))].join() + ")";
                                            break;
                                        case "path":
                                            x = [];
                                            l = 0;
                                            for (q = m[t].length; l < q; l++) {
                                                x[l] = [m[t][l][0]];
                                                v = 1;
                                                for (I = m[t][l].length; v < I; v++)
                                                    x[l][v] = +m[t][l][v] + u * f * h[t][l][v];
                                                x[l] = x[l].join(" ")
                                            }
                                            x = x.join(" ");
                                            break;
                                        case "transform":
                                            if (h[t].real)
                                                for (x = [],
                                                l = 0,
                                                q = m[t].length; l < q; l++)
                                                    for (x[l] = [m[t][l][0]],
                                                    v = 1,
                                                    I = m[t][l].length; v < I; v++)
                                                        x[l][v] = m[t][l][v] + u * f * h[t][l][v];
                                            else
                                                x = function(a) {
                                                    return +m[t][a] + u * f * h[t][a]
                                                }
                                                ,
                                                x = [["m", x(0), x(1), x(2), x(3), x(4), x(5)]];
                                            break;
                                        case "csv":
                                            if ("clip-rect" == t)
                                                for (x = [],
                                                l = 4; l--; )
                                                    x[l] = +m[t][l] + u * f * h[t][l];
                                            break;
                                        default:
                                            for (q = [].concat(m[t]),
                                            x = [],
                                            l = r.paper.customAttributes[t].length; l--; )
                                                x[l] = +q[l] + u * f * h[t][l]
                                        }
                                        n[t] = x
                                    }
                                r.attr(n);
                                (function(b, d, c) {
                                    setTimeout(function() {
                                        a("raphael.anim.frame." + b, d, c)
                                    })
                                }
                                )(r.id, r, e.anim)
                            } else {
                                if (function(b, d, g) {
                                    setTimeout(function() {
                                        a("raphael.anim.frame." + d.id, d, g);
                                        a("raphael.anim.finish." + d.id, d, g);
                                        c.is(b, "function") && b.call(d)
                                    })
                                }(e.callback, r, e.anim),
                                r.attr(v),
                                J.splice(d--, 1),
                                1 < e.repeat && !e.next) {
                                    for (k in v)
                                        v.hasOwnProperty(k) && (I[k] = e.totalOrigin[k]);
                                    e.el.attr(I);
                                    p(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1)
                                }
                                e.next && !e.stop && p(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat)
                            }
                    }
                }
                J.length && Ra(Da)
            }
              , Pa = function(a) {
                return 255 < a ? 255 : 0 > a ? 0 : a
            };
            L.animateWith = function(a, b, d, e, k, l) {
                if (this.removed)
                    return l && l.call(this),
                    this;
                d = d instanceof u ? d : c.animation(d, e, k, l);
                p(d, this, d.percents[0], null, this.attr());
                d = 0;
                for (e = J.length; d < e; d++)
                    if (J[d].anim == b && J[d].el == a) {
                        J[e - 1].start = J[d].start;
                        break
                    }
                return this
            }
            ;
            L.onAnimation = function(b) {
                return b ? a.on("raphael.anim.frame." + this.id, b) : a.unbind("raphael.anim.frame." + this.id),
                this
            }
            ;
            u.prototype.delay = function(a) {
                var b = new u(this.anim,this.ms);
                return b.times = this.times,
                b.del = +a || 0,
                b
            }
            ;
            u.prototype.repeat = function(a) {
                var b = new u(this.anim,this.ms);
                return b.del = this.del,
                b.times = q.floor(m(a, 0)) || 1,
                b
            }
            ;
            c.animation = function(a, b, d, e) {
                if (a instanceof u)
                    return a;
                !c.is(d, "function") && d || (e = e || d || null,
                d = null);
                a = Object(a);
                b = +b || 0;
                var g, k, l = {};
                for (k in a)
                    a.hasOwnProperty(k) && S(k) != k && S(k) + "%" != k && (g = !0,
                    l[k] = a[k]);
                if (g)
                    return d && (l.easing = d),
                    e && (l.callback = e),
                    new u({
                        100: l
                    },b);
                if (e) {
                    d = 0;
                    for (var f in a)
                        g = ka(f),
                        a.hasOwnProperty(f) && g > d && (d = g);
                    !a[d += "%"].callback && (a[d].callback = e)
                }
                return new u(a,b)
            }
            ;
            L.animate = function(a, b, d, e) {
                if (this.removed)
                    return e && e.call(this),
                    this;
                a = a instanceof u ? a : c.animation(a, b, d, e);
                return p(a, this, a.percents[0], null, this.attr()),
                this
            }
            ;
            L.setTime = function(a, b) {
                return a && null != b && this.status(a, v(b, a.ms) / a.ms),
                this
            }
            ;
            L.status = function(a, b) {
                var d, c = [], g = 0;
                if (null != b)
                    return p(a, this, -1, v(b, 1)),
                    this;
                for (b = J.length; g < b; g++)
                    if ((d = J[g]).el.id == this.id && (!a || d.anim == a)) {
                        if (a)
                            return d.status;
                        c.push({
                            anim: d.anim,
                            status: d.status
                        })
                    }
                return a ? 0 : c
            }
            ;
            L.pause = function(b) {
                for (var d = 0; d < J.length; d++)
                    J[d].el.id != this.id || b && J[d].anim != b || !1 !== a("raphael.anim.pause." + this.id, this, J[d].anim) && (J[d].paused = !0);
                return this
            }
            ;
            L.resume = function(b) {
                for (var d = 0; d < J.length; d++)
                    if (J[d].el.id == this.id && (!b || J[d].anim == b)) {
                        var c = J[d];
                        !1 !== a("raphael.anim.resume." + this.id, this, c.anim) && (delete c.paused,
                        this.status(c.anim, c.status))
                    }
                return this
            }
            ;
            L.stop = function(b) {
                for (var d = 0; d < J.length; d++)
                    J[d].el.id != this.id || b && J[d].anim != b || !1 !== a("raphael.anim.stop." + this.id, this, J[d].anim) && J.splice(d--, 1);
                return this
            }
            ;
            a.on("raphael.remove", U);
            a.on("raphael.clear", U);
            L.toString = function() {
                return "Rapha\u00ebl\u2019s object"
            }
            ;
            var ib, jb, na, kb, ta = function(a) {
                if (this.items = [],
                this.length = 0,
                this.type = "set",
                a)
                    for (var b = 0, d = a.length; b < d; b++)
                        !a[b] || a[b].constructor != L.constructor && a[b].constructor != ta || (this[this.items.length] = this.items[this.items.length] = a[b],
                        this.length++)
            }, ba = ta.prototype, Ba;
            for (Ba in ba.push = function() {
                for (var a, b, d = 0, c = arguments.length; d < c; d++)
                    !(a = arguments[d]) || a.constructor != L.constructor && a.constructor != ta || (this[b = this.items.length] = this.items[b] = a,
                    this.length++);
                return this
            }
            ,
            ba.pop = function() {
                return this.length && delete this[this.length--],
                this.items.pop()
            }
            ,
            ba.forEach = function(a, b) {
                for (var d = 0, c = this.items.length; d < c && !1 !== a.call(b, this.items[d], d); d++)
                    ;
                return this
            }
            ,
            L)
                L.hasOwnProperty(Ba) && (ba[Ba] = function(a) {
                    return function() {
                        var b = arguments;
                        return this.forEach(function(d) {
                            d[a][n](d, b)
                        })
                    }
                }(Ba));
            return ba.attr = function(a, b) {
                if (a && c.is(a, Z) && c.is(a[0], "object")) {
                    b = 0;
                    for (var d = a.length; b < d; b++)
                        this.items[b].attr(a[b])
                } else {
                    d = 0;
                    for (var e = this.items.length; d < e; d++)
                        this.items[d].attr(a, b)
                }
                return this
            }
            ,
            ba.clear = function() {
                for (; this.length; )
                    this.pop()
            }
            ,
            ba.splice = function(a, b, d) {
                a = 0 > a ? m(this.length + a, 0) : a;
                b = m(0, v(this.length - a, b));
                var c, e = [], g = [], k = [];
                for (c = 2; c < arguments.length; c++)
                    k.push(arguments[c]);
                for (c = 0; c < b; c++)
                    g.push(this[a + c]);
                for (; c < this.length - a; c++)
                    e.push(this[a + c]);
                var l = k.length;
                for (c = 0; c < l + e.length; c++)
                    this.items[a + c] = this[a + c] = c < l ? k[c] : e[c - l];
                for (c = this.items.length = this.length -= b - l; this[c]; )
                    delete this[c++];
                return new ta(g)
            }
            ,
            ba.exclude = function(a) {
                for (var b = 0, d = this.length; b < d; b++)
                    if (this[b] == a)
                        return this.splice(b, 1),
                        !0
            }
            ,
            ba.animate = function(a, b, d, e) {
                !c.is(d, "function") && d || (e = d || null);
                var g, k = this.items.length, l = k, f = this;
                if (!k)
                    return this;
                e && (g = function() {
                    !--k && e.call(f)
                }
                );
                d = c.is(d, "string") ? d : g;
                b = c.animation(a, b, d, g);
                for (a = this.items[--l].animate(b); l--; )
                    this.items[l] && !this.items[l].removed && this.items[l].animateWith(a, b, b),
                    this.items[l] && !this.items[l].removed || k--;
                return this
            }
            ,
            ba.insertAfter = function(a) {
                for (var b = this.items.length; b--; )
                    this.items[b].insertAfter(a);
                return this
            }
            ,
            ba.getBBox = function() {
                for (var a = [], b = [], d = [], c = [], e = this.items.length; e--; )
                    if (!this.items[e].removed) {
                        var k = this.items[e].getBBox();
                        a.push(k.x);
                        b.push(k.y);
                        d.push(k.x + k.width);
                        c.push(k.y + k.height)
                    }
                return {
                    x: a = v[n](0, a),
                    y: b = v[n](0, b),
                    x2: d = m[n](0, d),
                    y2: c = m[n](0, c),
                    width: d - a,
                    height: c - b
                }
            }
            ,
            ba.clone = function(a) {
                a = this.paper.set();
                for (var b = 0, d = this.items.length; b < d; b++)
                    a.push(this.items[b].clone());
                return a
            }
            ,
            ba.toString = function() {
                return "Rapha\u00ebl\u2018s set"
            }
            ,
            ba.glow = function(a) {
                var b = this.paper.set();
                return this.forEach(function(d, c) {
                    d = d.glow(a);
                    null != d && d.forEach(function(a, d) {
                        b.push(a)
                    })
                }),
                b
            }
            ,
            ba.isPointInside = function(a, b) {
                var d = !1;
                return this.forEach(function(c) {
                    if (c.isPointInside(a, b))
                        return d = !0,
                        !1
                }),
                d
            }
            ,
            c.registerFont = function(a) {
                if (!a.face)
                    return a;
                this.fonts = this.fonts || {};
                var b = {
                    w: a.w,
                    face: {},
                    glyphs: {}
                }, d = a.face["font-family"], c;
                for (c in a.face)
                    a.face.hasOwnProperty(c) && (b.face[c] = a.face[c]);
                if (this.fonts[d] ? this.fonts[d].push(b) : this.fonts[d] = [b],
                !a.svg)
                    for (var e in b.face["units-per-em"] = ka(a.face["units-per-em"], 10),
                    a.glyphs)
                        if (a.glyphs.hasOwnProperty(e) && (d = a.glyphs[e],
                        b.glyphs[e] = {
                            w: d.w,
                            k: {},
                            d: d.d && "M" + d.d.replace(/[mlcxtrv]/g, function(a) {
                                return {
                                    l: "L",
                                    c: "C",
                                    x: "z",
                                    t: "m",
                                    r: "l",
                                    v: "c"
                                }[a] || "M"
                            }) + "z"
                        },
                        d.k))
                            for (var g in d.k)
                                d.hasOwnProperty(g) && (b.glyphs[e].k[g] = d.k[g]);
                return a
            }
            ,
            C.getFont = function(a, b, d, e) {
                if (e = e || "normal",
                d = d || "normal",
                b = +b || {
                    normal: 400,
                    bold: 700,
                    lighter: 300,
                    bolder: 800
                }[b] || 400,
                c.fonts) {
                    var g, k = c.fonts[a];
                    if (!k) {
                        a = new RegExp("(^|\\s)" + a.replace(/[^\w\d\s+!~.:_-]/g, "") + "(\\s|$)","i");
                        for (var l in c.fonts)
                            if (c.fonts.hasOwnProperty(l) && a.test(l)) {
                                k = c.fonts[l];
                                break
                            }
                    }
                    if (k)
                        for (l = 0,
                        a = k.length; l < a && ((g = k[l]).face["font-weight"] != b || g.face["font-style"] != d && g.face["font-style"] || g.face["font-stretch"] != e); l++)
                            ;
                    return g
                }
            }
            ,
            C.print = function(a, b, d, e, k, l, f, q) {
                l = l || "middle";
                f = m(v(f || 0, 1), -1);
                q = m(v(q || 1, 3), 1);
                d = P(d).split("");
                var g = 0
                  , h = 0
                  , p = "";
                if (c.is(e, "string") && (e = this.getFont(e)),
                e) {
                    k = (k || 16) / e.face["units-per-em"];
                    var r = e.face.bbox.split(M)
                      , n = +r[0]
                      , w = r[3] - r[1]
                      , t = 0;
                    l = +r[1] + ("baseline" == l ? w + +e.face.descent : w / 2);
                    r = 0;
                    for (var I = d.length; r < I; r++) {
                        if ("\n" == d[r])
                            h = x = g = 0,
                            t += w * q;
                        else {
                            var u = h && e.glyphs[d[r - 1]] || {}
                              , x = e.glyphs[d[r]];
                            g += h ? (u.w || e.w) + (u.k && u.k[d[r]] || 0) + e.w * f : 0;
                            h = 1
                        }
                        x && x.d && (p += c.transformPath(x.d, ["t", g * k, t * k, "s", k, k, n, l, "t", (a - n) / k, (b - l) / k]))
                    }
                }
                return this.path(p).attr({
                    fill: "#000",
                    stroke: "none"
                })
            }
            ,
            C.add = function(a) {
                if (c.is(a, "array"))
                    for (var b, d = this.set(), e = 0, g = a.length; e < g; e++)
                        b = a[e] || {},
                        Q.hasOwnProperty(b.type) && d.push(this[b.type]().attr(b));
                return d
            }
            ,
            c.format = function(a, b) {
                var d = c.is(b, Z) ? [0].concat(b) : arguments;
                return a && c.is(a, "string") && d.length - 1 && (a = a.replace(V, function(a, b) {
                    return null == d[++b] ? "" : d[b]
                })),
                a || ""
            }
            ,
            c.fullfill = (ib = /\{([^\}]+)\}/g,
            jb = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            function(a, b) {
                return String(a).replace(ib, function(a, d) {
                    return function(a, b, d) {
                        var c = d;
                        return b.replace(jb, function(a, b, d, e, g) {
                            b = b || e;
                            c && (b in c && (c = c[b]),
                            "function" == typeof c && g && (c = c()))
                        }),
                        c = (null == c || c == d ? a : c) + ""
                    }(a, d, b)
                })
            }
            ),
            c.ninja = function() {
                if (W)
                    t.win.Raphael = ea;
                else {
                    window.Raphael = void 0;
                    try {
                        delete window.Raphael
                    } catch (g) {}
                }
                return c
            }
            ,
            c.st = ba,
            a.on("raphael.DOMload", function() {
                ca = !0
            }),
            null == (na = document).readyState && na.addEventListener && (na.addEventListener("DOMContentLoaded", kb = function() {
                na.removeEventListener("DOMContentLoaded", kb, !1);
                na.readyState = "complete"
            }
            , !1),
            na.readyState = "loading"),
            function w() {
                /in/.test(na.readyState) ? setTimeout(w, 9) : c.eve("raphael.DOMload")
            }(),
            c
        }
        .apply(e, h)) || (a.exports = f)
    }
    , function(a, e, h) {
        var f;
        h = [h(0), h(3), h(4)];
        void 0 === (f = function(a) {
            return a
        }
        .apply(e, h)) || (a.exports = f)
    }
    , function(a, e, h) {
        var f, d, c, x;
        var z = /[\.\/]/;
        var E = /\s*,\s*/;
        var N = function(a, d) {
            return a - d
        };
        var F = {
            n: {}
        };
        var G = function() {
            for (var a = 0, d = this.length; a < d; a++)
                if (void 0 !== this[a])
                    return this[a]
        };
        var y = function() {
            for (var a = this.length; --a; )
                if (void 0 !== this[a])
                    return this[a]
        };
        var T = Object.prototype.toString;
        var K = String;
        var u = Array.isArray || function(a) {
            return a instanceof Array || "[object Array]" == T.call(a)
        }
        ;
        (x = function(a, e) {
            var f, h = c, p = Array.prototype.slice.call(arguments, 2), u = x.listeners(a), z = 0, t = [], E = {}, F = [], K = d;
            F.firstDefined = G;
            F.lastDefined = y;
            d = a;
            for (var n = c = 0, U = u.length; n < U; n++)
                "zIndex"in u[n] && (t.push(u[n].zIndex),
                0 > u[n].zIndex && (E[u[n].zIndex] = u[n]));
            for (t.sort(N); 0 > t[z]; )
                if (f = E[t[z++]],
                F.push(f.apply(e, p)),
                c)
                    return c = h,
                    F;
            for (n = 0; n < U; n++)
                if ("zIndex"in (f = u[n]))
                    if (f.zIndex == t[z]) {
                        if (F.push(f.apply(e, p)),
                        c)
                            break;
                        do
                            if ((f = E[t[++z]]) && F.push(f.apply(e, p)),
                            c)
                                break;
                        while (f)
                    } else
                        E[f.zIndex] = f;
                else if (F.push(f.apply(e, p)),
                c)
                    break;
            return c = h,
            d = K,
            F
        }
        )._events = F;
        x.listeners = function(a) {
            var d, c, e, f, h = u(a) ? a : a.split(z), p = F, t = [p], x = [];
            var y = 0;
            for (e = h.length; y < e; y++) {
                var E = [];
                var n = 0;
                for (f = t.length; n < f; n++)
                    for (a = [(p = t[n].n)[h[y]], p["*"]],
                    c = 2; c--; )
                        (d = a[c]) && (E.push(d),
                        x = x.concat(d.f || []));
                t = E
            }
            return x
        }
        ;
        x.separator = function(a) {
            a ? (a = "[" + (a = K(a).replace(/(?=[\.\^\]\[\-])/g, "\\")) + "]",
            z = new RegExp(a)) : z = /[\.\/]/
        }
        ;
        x.on = function(a, d) {
            if ("function" != typeof d)
                return function() {}
                ;
            a = u(a) ? u(a[0]) ? a : [a] : K(a).split(E);
            for (var c = 0, e = a.length; c < e; c++)
                !function(a) {
                    a = u(a) ? a : K(a).split(z);
                    for (var c = F, e = 0, f = a.length; e < f; e++)
                        c = (c = c.n).hasOwnProperty(a[e]) && c[a[e]] || (c[a[e]] = {
                            n: {}
                        });
                    c.f = c.f || [];
                    e = 0;
                    for (f = c.f.length; e < f; e++)
                        if (c.f[e] == d) {
                            var h = !0;
                            break
                        }
                    !h && c.f.push(d)
                }(a[c]);
            return function(a) {
                +a == +a && (d.zIndex = +a)
            }
        }
        ;
        x.f = function(a) {
            var d = [].slice.call(arguments, 1);
            return function() {
                x.apply(null, [a, null].concat(d).concat([].slice.call(arguments, 0)))
            }
        }
        ;
        x.stop = function() {
            c = 1
        }
        ;
        x.nt = function(a) {
            var c = u(d) ? d.join(".") : d;
            return a ? (new RegExp("(?:\\.|\\/|^)" + a + "(?:\\.|\\/|$)")).test(c) : c
        }
        ;
        x.nts = function() {
            return u(d) ? d : d.split(z)
        }
        ;
        x.off = x.unbind = function(a, d) {
            if (a) {
                var c = u(a) ? u(a[0]) ? a : [a] : K(a).split(E);
                if (1 < c.length) {
                    a = 0;
                    for (var e = c.length; a < e; a++)
                        x.off(c[a], d)
                } else {
                    c = u(a) ? a : K(a).split(z);
                    var f, h, p, t, y = [F];
                    a = 0;
                    for (e = c.length; a < e; a++)
                        for (t = 0; t < y.length; t += p.length - 2) {
                            if (p = [t, 1],
                            f = y[t].n,
                            "*" != c[a])
                                f[c[a]] && p.push(f[c[a]]);
                            else
                                for (h in f)
                                    f.hasOwnProperty(h) && p.push(f[h]);
                            y.splice.apply(y, p)
                        }
                    a = 0;
                    for (e = y.length; a < e; a++)
                        for (f = y[a]; f.n; ) {
                            if (d) {
                                if (f.f) {
                                    t = 0;
                                    for (c = f.f.length; t < c; t++)
                                        if (f.f[t] == d) {
                                            f.f.splice(t, 1);
                                            break
                                        }
                                    !f.f.length && delete f.f
                                }
                                for (h in f.n)
                                    if (f.n.hasOwnProperty(h) && f.n[h].f) {
                                        p = f.n[h].f;
                                        t = 0;
                                        for (c = p.length; t < c; t++)
                                            if (p[t] == d) {
                                                p.splice(t, 1);
                                                break
                                            }
                                        !p.length && delete f.n[h].f
                                    }
                            } else
                                for (h in delete f.f,
                                f.n)
                                    f.n.hasOwnProperty(h) && f.n[h].f && delete f.n[h].f;
                            f = f.n
                        }
                }
            } else
                x._events = F = {
                    n: {}
                }
        }
        ;
        x.once = function(a, d) {
            var c = function() {
                return x.off(a, c),
                d.apply(this, arguments)
            };
            return x.on(a, c)
        }
        ;
        x.version = "0.5.0";
        x.toString = function() {
            return "You are running Eve 0.5.0"
        }
        ;
        a.exports ? a.exports = x : void 0 === (f = function() {
            return x
        }
        .apply(e, [])) || (a.exports = f)
    }
    , function(a, e, h) {
        var f;
        h = [h(0)];
        void 0 === (f = function(a) {
            if (!a || a.svg) {
                var d = String
                  , e = parseFloat
                  , f = parseInt
                  , h = Math
                  , N = h.max
                  , F = h.abs
                  , G = h.pow
                  , y = /[, ]+/
                  , T = a.eve
                  , K = {
                    block: "M5,0 0,2.5 5,5z",
                    classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                    diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                    open: "M6,1 1,3.5 6,6",
                    oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                }
                  , u = {};
                a.toString = function() {
                    return "Your browser supports SVG.\nYou are running Rapha\u00ebl " + this.version
                }
                ;
                var p = function(b, c) {
                    if (c)
                        for (var e in "string" == typeof b && (b = p(b)),
                        c)
                            c.hasOwnProperty(e) && ("xlink:" == e.substring(0, 6) ? b.setAttributeNS("http://www.w3.org/1999/xlink", e.substring(6), d(c[e])) : b.setAttribute(e, d(c[e])));
                    else
                        (b = a._g.doc.createElementNS("http://www.w3.org/2000/svg", b)).style && (b.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                    return b
                }
                  , U = function(b, c) {
                    var k = "linear"
                      , f = b.id + c
                      , m = .5
                      , v = .5
                      , r = b.node
                      , n = b.paper
                      , u = r.style
                      , t = a._g.doc.getElementById(f);
                    if (!t) {
                        if (c = (c = d(c).replace(a._radial_gradient, function(a, b, d) {
                            if (k = "radial",
                            b && d)
                                m = e(b),
                                a = 2 * (.5 < (v = e(d))) - 1,
                                .25 < G(m - .5, 2) + G(v - .5, 2) && (v = h.sqrt(.25 - G(m - .5, 2)) * a + .5) && .5 != v && (v = v.toFixed(5) - 1E-5 * a);
                            return ""
                        })).split(/\s*\-\s*/),
                        "linear" == k) {
                            t = c.shift();
                            if (t = -e(t),
                            isNaN(t))
                                return null;
                            var x = [0, 0, h.cos(a.rad(t)), h.sin(a.rad(t))];
                            t = 1 / (N(F(x[2]), F(x[3])) || 1);
                            x[2] *= t;
                            x[3] *= t;
                            0 > x[2] && (x[0] = -x[2],
                            x[2] = 0);
                            0 > x[3] && (x[1] = -x[3],
                            x[3] = 0)
                        }
                        c = a._parseDots(c);
                        if (!c)
                            return null;
                        if (f = f.replace(/[\(\)\s,\xb0#]/g, "_"),
                        b.gradient && f != b.gradient.id && (n.defs.removeChild(b.gradient),
                        delete b.gradient),
                        !b.gradient)
                            for (t = p(k + "Gradient", {
                                id: f
                            }),
                            b.gradient = t,
                            p(t, "radial" == k ? {
                                fx: m,
                                fy: v
                            } : {
                                x1: x[0],
                                y1: x[1],
                                x2: x[2],
                                y2: x[3],
                                gradientTransform: b.matrix.invert()
                            }),
                            n.defs.appendChild(t),
                            b = 0,
                            n = c.length; b < n; b++)
                                t.appendChild(p("stop", {
                                    offset: c[b].offset ? c[b].offset : b ? "100%" : "0%",
                                    "stop-color": c[b].color || "#fff",
                                    "stop-opacity": isFinite(c[b].opacity) ? c[b].opacity : 1
                                }))
                    }
                    return p(r, {
                        fill: ca(f),
                        opacity: 1,
                        "fill-opacity": 1
                    }),
                    u.fill = "",
                    u.opacity = 1,
                    u.fillOpacity = 1,
                    1
                }
                  , ca = function(a) {
                    if ((b = document.documentMode) && (9 === b || 10 === b))
                        return "url('#" + a + "')";
                    var b;
                    b = document.location;
                    return "url('" + (b.protocol + "//" + b.host + b.pathname + b.search) + "#" + a + "')"
                }
                  , C = function(a) {
                    var b = a.getBBox(1);
                    p(a.pattern, {
                        patternTransform: a.matrix.invert() + " translate(" + b.x + "," + b.y + ")"
                    })
                }
                  , M = function(b, c, e) {
                    if ("path" == b.type) {
                        for (var k, f, l, h, n, t = d(c).toLowerCase().split("-"), x = b.paper, y = e ? "end" : "start", z = b.node, F = b.attrs, C = F["stroke-width"], N = t.length, E = "classic", G = 3, T = 3, M = 5; N--; )
                            switch (t[N]) {
                            case "block":
                            case "classic":
                            case "oval":
                            case "diamond":
                            case "open":
                            case "none":
                                E = t[N];
                                break;
                            case "wide":
                                T = 5;
                                break;
                            case "narrow":
                                T = 2;
                                break;
                            case "long":
                                G = 5;
                                break;
                            case "short":
                                G = 2
                            }
                        if ("open" == E ? (G += 2,
                        T += 2,
                        M += 2,
                        l = 1,
                        h = e ? 4 : 1,
                        n = {
                            fill: "none",
                            stroke: F.stroke
                        }) : (h = l = G / 2,
                        n = {
                            fill: F.stroke,
                            stroke: "none"
                        }),
                        b._.arrows ? e ? (b._.arrows.endPath && u[b._.arrows.endPath]--,
                        b._.arrows.endMarker && u[b._.arrows.endMarker]--) : (b._.arrows.startPath && u[b._.arrows.startPath]--,
                        b._.arrows.startMarker && u[b._.arrows.startMarker]--) : b._.arrows = {},
                        "none" != E) {
                            t = "raphael-marker-" + E;
                            N = "raphael-marker-" + y + E + G + T + "-obj" + b.id;
                            a._g.doc.getElementById(t) ? u[t]++ : (x.defs.appendChild(p(p("path"), {
                                "stroke-linecap": "round",
                                d: K[E],
                                id: t
                            })),
                            u[t] = 1);
                            var P, Q = a._g.doc.getElementById(N);
                            Q ? (u[N]++,
                            P = Q.getElementsByTagName("use")[0]) : (Q = p(p("marker"), {
                                id: N,
                                markerHeight: T,
                                markerWidth: G,
                                orient: "auto",
                                refX: h,
                                refY: T / 2
                            }),
                            P = p(p("use"), {
                                "xlink:href": "#" + t,
                                transform: (e ? "rotate(180 " + G / 2 + " " + T / 2 + ") " : "") + "scale(" + G / M + "," + T / M + ")",
                                "stroke-width": (1 / ((G / M + T / M) / 2)).toFixed(4)
                            }),
                            Q.appendChild(P),
                            x.defs.appendChild(Q),
                            u[N] = 1);
                            p(P, n);
                            l *= "diamond" != E && "oval" != E;
                            e ? (k = b._.arrows.startdx * C || 0,
                            f = a.getTotalLength(F.path) - l * C) : (k = l * C,
                            f = a.getTotalLength(F.path) - (b._.arrows.enddx * C || 0));
                            (n = {})["marker-" + y] = "url(#" + N + ")";
                            (f || k) && (n.d = a.getSubpath(F.path, k, f));
                            p(z, n);
                            b._.arrows[y + "Path"] = t;
                            b._.arrows[y + "Marker"] = N;
                            b._.arrows[y + "dx"] = l;
                            b._.arrows[y + "Type"] = E;
                            b._.arrows[y + "String"] = c
                        } else
                            e ? (k = b._.arrows.startdx * C || 0,
                            f = a.getTotalLength(F.path) - k) : (k = 0,
                            f = a.getTotalLength(F.path) - (b._.arrows.enddx * C || 0)),
                            b._.arrows[y + "Path"] && p(z, {
                                d: a.getSubpath(F.path, k, f)
                            }),
                            delete b._.arrows[y + "Path"],
                            delete b._.arrows[y + "Marker"],
                            delete b._.arrows[y + "dx"],
                            delete b._.arrows[y + "Type"],
                            delete b._.arrows[y + "String"];
                        for (n in u)
                            u.hasOwnProperty(n) && !u[n] && (b = a._g.doc.getElementById(n)) && b.parentNode.removeChild(b)
                    }
                }
                  , Q = {
                    "-": [3, 1],
                    ".": [1, 1],
                    "-.": [3, 1, 1, 1],
                    "-..": [3, 1, 1, 1, 1, 1],
                    ". ": [1, 3],
                    "- ": [4, 3],
                    "--": [8, 3],
                    "- .": [4, 3, 1, 3],
                    "--.": [8, 3, 1, 3],
                    "--..": [8, 3, 1, 3, 1, 3]
                }
                  , V = function(a, c, e) {
                    if (c = Q[d(c).toLowerCase()]) {
                        var b = a.attrs["stroke-width"] || "1";
                        e = {
                            round: b,
                            square: b,
                            butt: 0
                        }[a.attrs["stroke-linecap"] || e["stroke-linecap"]] || 0;
                        for (var k = [], f = c.length; f--; )
                            k[f] = c[f] * b + (f % 2 ? 1 : -1) * e;
                        p(a.node, {
                            "stroke-dasharray": k.join(",")
                        })
                    } else
                        p(a.node, {
                            "stroke-dasharray": "none"
                        })
                }
                  , t = function(b, c) {
                    var e = b.node
                      , k = b.attrs
                      , m = e.style.visibility;
                    for (u in e.style.visibility = "hidden",
                    c)
                        if (c.hasOwnProperty(u) && a._availableAttrs.hasOwnProperty(u)) {
                            var h = c[u];
                            switch (k[u] = h,
                            u) {
                            case "blur":
                                b.blur(h);
                                break;
                            case "title":
                                var r = e.getElementsByTagName("title");
                                r.length && (r = r[0]) ? r.firstChild.nodeValue = h : (r = p("title"),
                                h = a._g.doc.createTextNode(h),
                                r.appendChild(h),
                                e.appendChild(r));
                                break;
                            case "href":
                            case "target":
                                r = e.parentNode;
                                if ("a" != r.tagName.toLowerCase()) {
                                    var n = p("a");
                                    r.insertBefore(n, e);
                                    n.appendChild(e);
                                    r = n
                                }
                                "target" == u ? r.setAttributeNS("http://www.w3.org/1999/xlink", "show", "blank" == h ? "new" : h) : r.setAttributeNS("http://www.w3.org/1999/xlink", u, h);
                                break;
                            case "cursor":
                                e.style.cursor = h;
                                break;
                            case "transform":
                                b.transform(h);
                                break;
                            case "arrow-start":
                                M(b, h);
                                break;
                            case "arrow-end":
                                M(b, h, 1);
                                break;
                            case "clip-rect":
                                r = d(h).split(y);
                                if (4 == r.length) {
                                    b.clip && b.clip.parentNode.parentNode.removeChild(b.clip.parentNode);
                                    n = p("clipPath");
                                    var t = p("rect");
                                    n.id = a.createUUID();
                                    p(t, {
                                        x: r[0],
                                        y: r[1],
                                        width: r[2],
                                        height: r[3]
                                    });
                                    n.appendChild(t);
                                    b.paper.defs.appendChild(n);
                                    p(e, {
                                        "clip-path": "url(#" + n.id + ")"
                                    });
                                    b.clip = t
                                }
                                !h && (h = e.getAttribute("clip-path")) && ((h = a._g.doc.getElementById(h.replace(/(^url\(#|\)$)/g, ""))) && h.parentNode.removeChild(h),
                                p(e, {
                                    "clip-path": ""
                                }),
                                delete b.clip);
                                break;
                            case "path":
                                "path" == b.type && (p(e, {
                                    d: h ? k.path = a._pathToAbsolute(h) : "M0,0"
                                }),
                                b._.dirty = 1,
                                b._.arrows && ("startString"in b._.arrows && M(b, b._.arrows.startString),
                                "endString"in b._.arrows && M(b, b._.arrows.endString, 1)));
                                break;
                            case "width":
                                if (e.setAttribute(u, h),
                                b._.dirty = 1,
                                !k.fx)
                                    break;
                                var u = "x";
                                h = k.x;
                            case "x":
                                k.fx && (h = -k.x - (k.width || 0));
                            case "rx":
                                if ("rx" == u && "rect" == b.type)
                                    break;
                            case "cx":
                                e.setAttribute(u, h);
                                b.pattern && C(b);
                                b._.dirty = 1;
                                break;
                            case "height":
                                if (e.setAttribute(u, h),
                                b._.dirty = 1,
                                !k.fy)
                                    break;
                                u = "y";
                                h = k.y;
                            case "y":
                                k.fy && (h = -k.y - (k.height || 0));
                            case "ry":
                                if ("ry" == u && "rect" == b.type)
                                    break;
                            case "cy":
                                e.setAttribute(u, h);
                                b.pattern && C(b);
                                b._.dirty = 1;
                                break;
                            case "r":
                                "rect" == b.type ? p(e, {
                                    rx: h,
                                    ry: h
                                }) : e.setAttribute(u, h);
                                b._.dirty = 1;
                                break;
                            case "src":
                                "image" == b.type && e.setAttributeNS("http://www.w3.org/1999/xlink", "href", h);
                                break;
                            case "stroke-width":
                                1 == b._.sx && 1 == b._.sy || (h /= N(F(b._.sx), F(b._.sy)) || 1);
                                e.setAttribute(u, h);
                                k["stroke-dasharray"] && V(b, k["stroke-dasharray"], c);
                                b._.arrows && ("startString"in b._.arrows && M(b, b._.arrows.startString),
                                "endString"in b._.arrows && M(b, b._.arrows.endString, 1));
                                break;
                            case "stroke-dasharray":
                                V(b, h, c);
                                break;
                            case "fill":
                                var x = d(h).match(a._ISURL);
                                if (x) {
                                    n = p("pattern");
                                    var z = p("image");
                                    n.id = a.createUUID();
                                    p(n, {
                                        x: 0,
                                        y: 0,
                                        patternUnits: "userSpaceOnUse",
                                        height: 1,
                                        width: 1
                                    });
                                    p(z, {
                                        x: 0,
                                        y: 0,
                                        "xlink:href": x[1]
                                    });
                                    n.appendChild(z);
                                    (function(b) {
                                        a._preload(x[1], function() {
                                            var a = this.offsetWidth
                                              , c = this.offsetHeight;
                                            p(b, {
                                                width: a,
                                                height: c
                                            });
                                            p(z, {
                                                width: a,
                                                height: c
                                            })
                                        })
                                    }
                                    )(n);
                                    b.paper.defs.appendChild(n);
                                    p(e, {
                                        fill: "url(#" + n.id + ")"
                                    });
                                    b.pattern = n;
                                    b.pattern && C(b);
                                    break
                                }
                                r = a.getRGB(h);
                                if (r.error) {
                                    if (("circle" == b.type || "ellipse" == b.type || "r" != d(h).charAt()) && U(b, h)) {
                                        if ("opacity"in k || "fill-opacity"in k) {
                                            var E = a._g.doc.getElementById(e.getAttribute("fill").replace(/^url\(#|\)$/g, ""));
                                            if (E) {
                                                var G = E.getElementsByTagName("stop");
                                                p(G[G.length - 1], {
                                                    "stop-opacity": ("opacity"in k ? k.opacity : 1) * ("fill-opacity"in k ? k["fill-opacity"] : 1)
                                                })
                                            }
                                        }
                                        k.gradient = h;
                                        k.fill = "none";
                                        break
                                    }
                                } else
                                    delete c.gradient,
                                    delete k.gradient,
                                    !a.is(k.opacity, "undefined") && a.is(c.opacity, "undefined") && p(e, {
                                        opacity: k.opacity
                                    }),
                                    !a.is(k["fill-opacity"], "undefined") && a.is(c["fill-opacity"], "undefined") && p(e, {
                                        "fill-opacity": k["fill-opacity"]
                                    });
                                r.hasOwnProperty("opacity") && p(e, {
                                    "fill-opacity": 1 < r.opacity ? r.opacity / 100 : r.opacity
                                });
                            case "stroke":
                                r = a.getRGB(h);
                                e.setAttribute(u, r.hex);
                                "stroke" == u && r.hasOwnProperty("opacity") && p(e, {
                                    "stroke-opacity": 1 < r.opacity ? r.opacity / 100 : r.opacity
                                });
                                "stroke" == u && b._.arrows && ("startString"in b._.arrows && M(b, b._.arrows.startString),
                                "endString"in b._.arrows && M(b, b._.arrows.endString, 1));
                                break;
                            case "gradient":
                                "circle" != b.type && "ellipse" != b.type && "r" == d(h).charAt() || U(b, h);
                                break;
                            case "opacity":
                                k.gradient && !k.hasOwnProperty("stroke-opacity") && p(e, {
                                    "stroke-opacity": 1 < h ? h / 100 : h
                                });
                            case "fill-opacity":
                                if (k.gradient) {
                                    (E = a._g.doc.getElementById(e.getAttribute("fill").replace(/^url\(#|\)$/g, ""))) && (G = E.getElementsByTagName("stop"),
                                    p(G[G.length - 1], {
                                        "stop-opacity": h
                                    }));
                                    break
                                }
                            default:
                                "font-size" == u && (h = f(h, 10) + "px"),
                                r = u.replace(/(\-.)/g, function(a) {
                                    return a.substring(1).toUpperCase()
                                }),
                                e.style[r] = h,
                                b._.dirty = 1,
                                e.setAttribute(u, h)
                            }
                        }
                    W(b, c);
                    e.style.visibility = m
                }
                  , W = function(b, c) {
                    if ("text" == b.type && (c.hasOwnProperty("text") || c.hasOwnProperty("font") || c.hasOwnProperty("font-size") || c.hasOwnProperty("x") || c.hasOwnProperty("y"))) {
                        var e = b.attrs
                          , k = b.node
                          , h = k.firstChild ? f(a._g.doc.defaultView.getComputedStyle(k.firstChild, "").getPropertyValue("font-size"), 10) : 10;
                        if (c.hasOwnProperty("text")) {
                            for (e.text = c.text; k.firstChild; )
                                k.removeChild(k.firstChild);
                            var v = d(c.text).split("\n");
                            c = [];
                            for (var r = 0, n = v.length; r < n; r++) {
                                var t = p("tspan");
                                r && p(t, {
                                    dy: 1.2 * h,
                                    x: e.x
                                });
                                t.appendChild(a._g.doc.createTextNode(v[r]));
                                k.appendChild(t);
                                c[r] = t
                            }
                        } else
                            for (r = 0,
                            n = (c = k.getElementsByTagName("tspan")).length; r < n; r++)
                                r ? p(c[r], {
                                    dy: 1.2 * h,
                                    x: e.x
                                }) : p(c[0], {
                                    dy: 0
                                });
                        p(k, {
                            x: e.x,
                            y: e.y
                        });
                        b._.dirty = 1;
                        b = b._getBBox();
                        (e = e.y - (b.y + b.height / 2)) && a.is(e, "finite") && p(c[0], {
                            dy: e
                        })
                    }
                }
                  , ea = function(a) {
                    return a.parentNode && "a" === a.parentNode.tagName.toLowerCase() ? a.parentNode : a
                }
                  , aa = function(b, c) {
                    this[0] = this.node = b;
                    b.raphael = !0;
                    this.id = ("0000" + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5);
                    b.raphaelid = this.id;
                    this.matrix = a.matrix();
                    this.realPath = null;
                    this.paper = c;
                    this.attrs = this.attrs || {};
                    this._ = {
                        transform: [],
                        sx: 1,
                        sy: 1,
                        deg: 0,
                        dx: 0,
                        dy: 0,
                        dirty: 1
                    };
                    !c.bottom && (c.bottom = this);
                    (this.prev = c.top) && (c.top.next = this);
                    c.top = this;
                    this.next = null
                }
                  , n = a.el;
                aa.prototype = n;
                n.constructor = aa;
                a._engine.path = function(a, c) {
                    var b = p("path");
                    c.canvas && c.canvas.appendChild(b);
                    c = new aa(b,c);
                    return c.type = "path",
                    t(c, {
                        fill: "none",
                        stroke: "#000",
                        path: a
                    }),
                    c
                }
                ;
                n.rotate = function(a, c, f) {
                    if (this.removed)
                        return this;
                    if ((a = d(a).split(y)).length - 1 && (c = e(a[1]),
                    f = e(a[2])),
                    a = e(a[0]),
                    null == f && (c = f),
                    null == c || null == f)
                        f = this.getBBox(1),
                        c = f.x + f.width / 2,
                        f = f.y + f.height / 2;
                    return this.transform(this._.transform.concat([["r", a, c, f]])),
                    this
                }
                ;
                n.scale = function(a, c, f, h) {
                    if (this.removed)
                        return this;
                    if ((a = d(a).split(y)).length - 1 && (c = e(a[1]),
                    f = e(a[2]),
                    h = e(a[3])),
                    a = e(a[0]),
                    null == c && (c = a),
                    null == h && (f = h),
                    null == f || null == h)
                        var b = this.getBBox(1);
                    return f = null == f ? b.x + b.width / 2 : f,
                    h = null == h ? b.y + b.height / 2 : h,
                    this.transform(this._.transform.concat([["s", a, c, f, h]])),
                    this
                }
                ;
                n.translate = function(a, c) {
                    return this.removed ? this : ((a = d(a).split(y)).length - 1 && (c = e(a[1])),
                    a = e(a[0]) || 0,
                    c = +c || 0,
                    this.transform(this._.transform.concat([["t", a, c]])),
                    this)
                }
                ;
                n.transform = function(b) {
                    var c = this._;
                    if (null == b)
                        return c.transform;
                    if (a._extractTransform(this, b),
                    this.clip && p(this.clip, {
                        transform: this.matrix.invert()
                    }),
                    this.pattern && C(this),
                    this.node && p(this.node, {
                        transform: this.matrix
                    }),
                    1 != c.sx || 1 != c.sy)
                        b = this.attrs.hasOwnProperty("stroke-width") ? this.attrs["stroke-width"] : 1,
                        this.attr({
                            "stroke-width": b
                        });
                    return this
                }
                ;
                n.hide = function() {
                    return this.removed || (this.node.style.display = "none"),
                    this
                }
                ;
                n.show = function() {
                    return this.removed || (this.node.style.display = ""),
                    this
                }
                ;
                n.remove = function() {
                    var b = ea(this.node);
                    if (!this.removed && b.parentNode) {
                        var c = this.paper, d;
                        for (d in c.__set__ && c.__set__.exclude(this),
                        T.unbind("raphael.*.*." + this.id),
                        this.gradient && c.defs.removeChild(this.gradient),
                        a._tear(this, c),
                        b.parentNode.removeChild(b),
                        this.removeData(),
                        this)
                            this[d] = "function" == typeof this[d] ? a._removedFactory(d) : null;
                        this.removed = !0
                    }
                }
                ;
                n._getBBox = function() {
                    if ("none" == this.node.style.display) {
                        this.show();
                        var a = !0
                    }
                    var c, d = !1;
                    this.paper.canvas.parentElement ? c = this.paper.canvas.parentElement.style : this.paper.canvas.parentNode && (c = this.paper.canvas.parentNode.style);
                    c && "none" == c.display && (d = !0,
                    c.display = "");
                    var e = {};
                    try {
                        e = this.node.getBBox()
                    } catch (m) {
                        e = {
                            x: this.node.clientLeft,
                            y: this.node.clientTop,
                            width: this.node.clientWidth,
                            height: this.node.clientHeight
                        }
                    } finally {
                        e = e || {},
                        d && (c.display = "none")
                    }
                    return a && this.hide(),
                    e
                }
                ;
                n.attr = function(b, c) {
                    if (this.removed)
                        return this;
                    if (null == b) {
                        b = {};
                        for (var d in this.attrs)
                            this.attrs.hasOwnProperty(d) && (b[d] = this.attrs[d]);
                        return b.gradient && "none" == b.fill && (b.fill = b.gradient) && delete b.gradient,
                        b.transform = this._.transform,
                        b
                    }
                    if (null == c && a.is(b, "string")) {
                        if ("fill" == b && "none" == this.attrs.fill && this.attrs.gradient)
                            return this.attrs.gradient;
                        if ("transform" == b)
                            return this._.transform;
                        d = b.split(y);
                        for (var e = {}, f = 0, k = d.length; f < k; f++)
                            (b = d[f])in this.attrs ? e[b] = this.attrs[b] : a.is(this.paper.customAttributes[b], "function") ? e[b] = this.paper.customAttributes[b].def : e[b] = a._availableAttrs[b];
                        return k - 1 ? e : e[d[0]]
                    }
                    if (null == c && a.is(b, "array")) {
                        e = {};
                        f = 0;
                        for (k = b.length; f < k; f++)
                            e[b[f]] = this.attr(b[f]);
                        return e
                    }
                    null != c ? (e = {},
                    e[b] = c) : null != b && a.is(b, "object") && (e = b);
                    for (f in e)
                        T("raphael.attr." + f + "." + this.id, this, e[f]);
                    for (f in this.paper.customAttributes)
                        if (this.paper.customAttributes.hasOwnProperty(f) && e.hasOwnProperty(f) && a.is(this.paper.customAttributes[f], "function"))
                            for (k in b = this.paper.customAttributes[f].apply(this, [].concat(e[f])),
                            this.attrs[f] = e[f],
                            b)
                                b.hasOwnProperty(k) && (e[k] = b[k]);
                    return t(this, e),
                    this
                }
                ;
                n.toFront = function() {
                    if (this.removed)
                        return this;
                    var b = ea(this.node);
                    b.parentNode.appendChild(b);
                    b = this.paper;
                    return b.top != this && a._tofront(this, b),
                    this
                }
                ;
                n.toBack = function() {
                    if (this.removed)
                        return this;
                    var b = ea(this.node)
                      , c = b.parentNode;
                    c.insertBefore(b, c.firstChild);
                    a._toback(this, this.paper);
                    this.paper;
                    return this
                }
                ;
                n.insertAfter = function(b) {
                    if (this.removed || !b)
                        return this;
                    var c = ea(this.node)
                      , d = ea(b.node || b[b.length - 1].node);
                    return d.nextSibling ? d.parentNode.insertBefore(c, d.nextSibling) : d.parentNode.appendChild(c),
                    a._insertafter(this, b, this.paper),
                    this
                }
                ;
                n.insertBefore = function(b) {
                    if (this.removed || !b)
                        return this;
                    var c = ea(this.node)
                      , d = ea(b.node || b[0].node);
                    return d.parentNode.insertBefore(c, d),
                    a._insertbefore(this, b, this.paper),
                    this
                }
                ;
                n.blur = function(b) {
                    if (0 != +b) {
                        var c = p("filter")
                          , d = p("feGaussianBlur");
                        this.attrs.blur = b;
                        c.id = a.createUUID();
                        p(d, {
                            stdDeviation: +b || 1.5
                        });
                        c.appendChild(d);
                        this.paper.defs.appendChild(c);
                        this._blur = c;
                        p(this.node, {
                            filter: "url(#" + c.id + ")"
                        })
                    } else
                        this._blur && (this._blur.parentNode.removeChild(this._blur),
                        delete this._blur,
                        delete this.attrs.blur),
                        this.node.removeAttribute("filter");
                    return this
                }
                ;
                a._engine.circle = function(a, c, d, e) {
                    var b = p("circle");
                    a.canvas && a.canvas.appendChild(b);
                    a = new aa(b,a);
                    return a.attrs = {
                        cx: c,
                        cy: d,
                        r: e,
                        fill: "none",
                        stroke: "#000"
                    },
                    a.type = "circle",
                    p(b, a.attrs),
                    a
                }
                ;
                a._engine.rect = function(a, c, d, e, f, h) {
                    var b = p("rect");
                    a.canvas && a.canvas.appendChild(b);
                    a = new aa(b,a);
                    return a.attrs = {
                        x: c,
                        y: d,
                        width: e,
                        height: f,
                        rx: h || 0,
                        ry: h || 0,
                        fill: "none",
                        stroke: "#000"
                    },
                    a.type = "rect",
                    p(b, a.attrs),
                    a
                }
                ;
                a._engine.ellipse = function(a, c, d, e, f) {
                    var b = p("ellipse");
                    a.canvas && a.canvas.appendChild(b);
                    a = new aa(b,a);
                    return a.attrs = {
                        cx: c,
                        cy: d,
                        rx: e,
                        ry: f,
                        fill: "none",
                        stroke: "#000"
                    },
                    a.type = "ellipse",
                    p(b, a.attrs),
                    a
                }
                ;
                a._engine.image = function(a, c, d, e, f, h) {
                    var b = p("image");
                    p(b, {
                        x: d,
                        y: e,
                        width: f,
                        height: h,
                        preserveAspectRatio: "none"
                    });
                    b.setAttributeNS("http://www.w3.org/1999/xlink", "href", c);
                    a.canvas && a.canvas.appendChild(b);
                    a = new aa(b,a);
                    return a.attrs = {
                        x: d,
                        y: e,
                        width: f,
                        height: h,
                        src: c
                    },
                    a.type = "image",
                    a
                }
                ;
                a._engine.text = function(b, c, d, e) {
                    var f = p("text");
                    b.canvas && b.canvas.appendChild(f);
                    b = new aa(f,b);
                    return b.attrs = {
                        x: c,
                        y: d,
                        "text-anchor": "middle",
                        text: e,
                        "font-family": a._availableAttrs["font-family"],
                        "font-size": a._availableAttrs["font-size"],
                        stroke: "none",
                        fill: "#000"
                    },
                    b.type = "text",
                    t(b, b.attrs),
                    b
                }
                ;
                a._engine.setSize = function(a, c) {
                    return this.width = a || this.width,
                    this.height = c || this.height,
                    this.canvas.setAttribute("width", this.width),
                    this.canvas.setAttribute("height", this.height),
                    this._viewBox && this.setViewBox.apply(this, this._viewBox),
                    this
                }
                ;
                a._engine.create = function() {
                    var b = a._getContainer.apply(0, arguments)
                      , c = b && b.container;
                    if (!c)
                        throw Error("SVG container not found.");
                    var d, e = b.x, f = b.y, h = b.width;
                    b = b.height;
                    var r = p("svg");
                    return e = e || 0,
                    f = f || 0,
                    p(r, {
                        height: b = b || 342,
                        version: 1.1,
                        width: h = h || 512,
                        xmlns: "http://www.w3.org/2000/svg",
                        "xmlns:xlink": "http://www.w3.org/1999/xlink"
                    }),
                    1 == c ? (r.style.cssText = "overflow:hidden;position:absolute;left:" + e + "px;top:" + f + "px",
                    a._g.doc.body.appendChild(r),
                    d = 1) : (r.style.cssText = "overflow:hidden;position:relative",
                    c.firstChild ? c.insertBefore(r, c.firstChild) : c.appendChild(r)),
                    (c = new a._Paper).width = h,
                    c.height = b,
                    c.canvas = r,
                    c.clear(),
                    c._left = c._top = 0,
                    d && (c.renderfix = function() {}
                    ),
                    c.renderfix(),
                    c
                }
                ;
                a._engine.setViewBox = function(a, c, d, e, f) {
                    T("raphael.setViewBox", this, this._viewBox, [a, c, d, e, f]);
                    var b, k = this.getSize();
                    k = N(d / k.width, e / k.height);
                    var h = this.top
                      , l = f ? "xMidYMid meet" : "xMinYMin";
                    null == a ? (this._vbSize && (k = 1),
                    delete this._vbSize,
                    b = "0 0 " + this.width + " " + this.height) : (this._vbSize = k,
                    b = a + " " + c + " " + d + " " + e);
                    for (p(this.canvas, {
                        viewBox: b,
                        preserveAspectRatio: l
                    }); k && h; )
                        b = "stroke-width"in h.attrs ? h.attrs["stroke-width"] : 1,
                        h.attr({
                            "stroke-width": b
                        }),
                        h._.dirty = 1,
                        h._.dirtyT = 1,
                        h = h.prev;
                    return this._viewBox = [a, c, d, e, !!f],
                    this
                }
                ;
                a.prototype.renderfix = function() {
                    var a = this.canvas
                      , c = a.style;
                    try {
                        var d = a.getScreenCTM() || a.createSVGMatrix()
                    } catch (q) {
                        d = a.createSVGMatrix()
                    }
                    a = -d.e % 1;
                    d = -d.f % 1;
                    (a || d) && (a && (this._left = (this._left + a) % 1,
                    c.left = this._left + "px"),
                    d && (this._top = (this._top + d) % 1,
                    c.top = this._top + "px"))
                }
                ;
                a.prototype.clear = function() {
                    a.eve("raphael.clear", this);
                    for (var b = this.canvas; b.firstChild; )
                        b.removeChild(b.firstChild);
                    this.bottom = this.top = null;
                    (this.desc = p("desc")).appendChild(a._g.doc.createTextNode("Created with Rapha\u00ebl " + a.version));
                    b.appendChild(this.desc);
                    b.appendChild(this.defs = p("defs"))
                }
                ;
                a.prototype.remove = function() {
                    for (var b in T("raphael.remove", this),
                    this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas),
                    this)
                        this[b] = "function" == typeof this[b] ? a._removedFactory(b) : null
                }
                ;
                var ha = a.st, P;
                for (P in n)
                    n.hasOwnProperty(P) && !ha.hasOwnProperty(P) && (ha[P] = function(a) {
                        return function() {
                            var b = arguments;
                            return this.forEach(function(c) {
                                c[a].apply(c, b)
                            })
                        }
                    }(P))
            }
        }
        .apply(e, h)) || (a.exports = f)
    }
    , function(a, e, h) {
        var f;
        h = [h(0)];
        void 0 === (f = function(a) {
            if (!a || a.vml) {
                var c = String
                  , e = parseFloat
                  , d = Math
                  , f = d.round
                  , h = d.max
                  , F = d.min
                  , G = d.abs
                  , y = /[, ]+/
                  , T = a.eve
                  , K = {
                    M: "m",
                    L: "l",
                    C: "c",
                    Z: "x",
                    m: "t",
                    l: "r",
                    c: "v",
                    z: "x"
                }
                  , u = /([clmz]),?([^clmz]*)/gi
                  , p = / progid:\S+Blur\([^\)]+\)/g
                  , U = /-?[^,\s-]+/g
                  , ca = {
                    path: 1,
                    rect: 1,
                    image: 1
                }
                  , C = {
                    circle: 1,
                    ellipse: 1
                }
                  , M = function(b, c, e) {
                    var d = a.matrix();
                    return d.rotate(-b, .5, .5),
                    {
                        dx: d.x(c, e),
                        dy: d.y(c, e)
                    }
                }
                  , Q = function(a, c, e, d, f, h) {
                    var b = a._
                      , k = a.matrix
                      , l = b.fillpos;
                    a = a.node;
                    var m = a.style
                      , q = 1
                      , n = ""
                      , v = 21600 / c
                      , p = 21600 / e;
                    if (m.visibility = "hidden",
                    c && e) {
                        if (a.coordsize = G(v) + " " + G(p),
                        m.rotation = h * (0 > c * e ? -1 : 1),
                        h) {
                            var t = M(h, d, f);
                            d = t.dx;
                            f = t.dy
                        }
                        if (0 > c && (n += "x"),
                        0 > e && (n += " y") && (q = -1),
                        m.flip = n,
                        a.coordorigin = d * -v + " " + f * -p,
                        l || b.fillsize)
                            d = (d = a.getElementsByTagName("fill")) && d[0],
                            a.removeChild(d),
                            l && (t = M(h, k.x(l[0], l[1]), k.y(l[0], l[1])),
                            d.position = t.dx * q + " " + t.dy * q),
                            b.fillsize && (d.size = b.fillsize[0] * G(c) + " " + b.fillsize[1] * G(e)),
                            a.appendChild(d);
                        m.visibility = "visible"
                    }
                };
                a.toString = function() {
                    return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\u00ebl " + this.version
                }
                ;
                var V, t = function(a, e, d) {
                    e = c(e).toLowerCase().split("-");
                    d = d ? "end" : "start";
                    for (var b = e.length, f = "classic", k = "medium", h = "medium"; b--; )
                        switch (e[b]) {
                        case "block":
                        case "classic":
                        case "oval":
                        case "diamond":
                        case "open":
                        case "none":
                            f = e[b];
                            break;
                        case "wide":
                        case "narrow":
                            h = e[b];
                            break;
                        case "long":
                        case "short":
                            k = e[b]
                        }
                    a = a.node.getElementsByTagName("stroke")[0];
                    a[d + "arrow"] = f;
                    a[d + "arrowlength"] = k;
                    a[d + "arrowwidth"] = h
                }, W = function(b, d) {
                    b.attrs = b.attrs || {};
                    var l = b.node
                      , k = b.attrs
                      , m = l.style
                      , n = ca[b.type] && (d.x != k.x || d.y != k.y || d.width != k.width || d.height != k.height || d.cx != k.cx || d.cy != k.cy || d.rx != k.rx || d.ry != k.ry || d.r != k.r)
                      , r = C[b.type] && (k.cx != d.cx || k.cy != d.cy || k.r != d.r || k.rx != d.rx || k.ry != d.ry);
                    for (p in d)
                        d.hasOwnProperty(p) && (k[p] = d[p]);
                    if (n && (k.path = a._getPath[b.type](b),
                    b._.dirty = 1),
                    d.href && (l.href = d.href),
                    d.title && (l.title = d.title),
                    d.target && (l.target = d.target),
                    d.cursor && (m.cursor = d.cursor),
                    "blur"in d && b.blur(d.blur),
                    (d.path && "path" == b.type || n) && (l.path = function(b) {
                        var d = /[ahqstv]/gi
                          , e = a._pathToAbsolute;
                        if (c(b).match(d) && (e = a._path2curve),
                        d = /[clmz]/g,
                        e == a._pathToAbsolute && !c(b).match(d))
                            return b = c(b).replace(u, function(a, b, c) {
                                var d = []
                                  , e = "m" == b.toLowerCase()
                                  , k = K[b];
                                return c.replace(U, function(a) {
                                    e && 2 == d.length && (k += d + K["m" == b ? "l" : "L"],
                                    d = []);
                                    d.push(f(21600 * a))
                                }),
                                k + d
                            });
                        var k = e(b);
                        b = [];
                        for (var h = 0, l = k.length; h < l; h++) {
                            d = k[h];
                            "z" == (e = k[h][0].toLowerCase()) && (e = "x");
                            for (var m = 1, q = d.length; m < q; m++)
                                e += f(21600 * d[m]) + (m != q - 1 ? "," : "");
                            b.push(e)
                        }
                        return b.join(" ")
                    }(~c(k.path).toLowerCase().indexOf("r") ? a._pathToAbsolute(k.path) : k.path),
                    b._.dirty = 1,
                    "image" == b.type && (b._.fillpos = [k.x, k.y],
                    b._.fillsize = [k.width, k.height],
                    Q(b, 1, 1, 0, 0, 0))),
                    "transform"in d && b.transform(d.transform),
                    r) {
                        m = +k.cx;
                        n = +k.cy;
                        r = +k.rx || +k.r || 0;
                        var p = +k.ry || +k.r || 0;
                        l.path = a.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", f(21600 * (m - r)), f(21600 * (n - p)), f(21600 * (m + r)), f(21600 * (n + p)), f(21600 * m));
                        b._.dirty = 1
                    }
                    "clip-rect"in d && (m = c(d["clip-rect"]).split(y),
                    4 == m.length && (m[2] = +m[2] + +m[0],
                    m[3] = +m[3] + +m[1],
                    n = l.clipRect || a._g.doc.createElement("div"),
                    r = n.style,
                    r.clip = a.format("rect({1}px {2}px {3}px {0}px)", m),
                    l.clipRect || (r.position = "absolute",
                    r.top = 0,
                    r.left = 0,
                    r.width = b.paper.width + "px",
                    r.height = b.paper.height + "px",
                    l.parentNode.insertBefore(n, l),
                    n.appendChild(l),
                    l.clipRect = n)),
                    d["clip-rect"] || l.clipRect && (l.clipRect.style.clip = "auto"));
                    b.textpath && (m = b.textpath.style,
                    d.font && (m.font = d.font),
                    d["font-family"] && (m.fontFamily = '"' + d["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, "") + '"'),
                    d["font-size"] && (m.fontSize = d["font-size"]),
                    d["font-weight"] && (m.fontWeight = d["font-weight"]),
                    d["font-style"] && (m.fontStyle = d["font-style"]));
                    if ("arrow-start"in d && t(b, d["arrow-start"]),
                    "arrow-end"in d && t(b, d["arrow-end"], 1),
                    null != d.opacity || null != d.fill || null != d.src || null != d.stroke || null != d["stroke-width"] || null != d["stroke-opacity"] || null != d["fill-opacity"] || null != d["stroke-dasharray"] || null != d["stroke-miterlimit"] || null != d["stroke-linejoin"] || null != d["stroke-linecap"]) {
                        m = l.getElementsByTagName("fill");
                        if (!(m = m && m[0]) && (m = V("fill")),
                        "image" == b.type && d.src && (m.src = d.src),
                        d.fill && (m.on = !0),
                        null != m.on && "none" != d.fill && null !== d.fill || (m.on = !1),
                        m.on && d.fill)
                            (n = c(d.fill).match(a._ISURL)) ? (m.parentNode == l && l.removeChild(m),
                            m.rotate = !0,
                            m.src = n[1],
                            m.type = "tile",
                            r = b.getBBox(1),
                            m.position = r.x + " " + r.y,
                            b._.fillpos = [r.x, r.y],
                            a._preload(n[1], function() {
                                b._.fillsize = [this.offsetWidth, this.offsetHeight]
                            })) : (m.color = a.getRGB(d.fill).hex,
                            m.src = "",
                            m.type = "solid",
                            a.getRGB(d.fill).error && (b.type in {
                                circle: 1,
                                ellipse: 1
                            } || "r" != c(d.fill).charAt()) && ea(b, d.fill, m) && (k.fill = "none",
                            k.gradient = d.fill,
                            m.rotate = !1));
                        if ("fill-opacity"in d || "opacity"in d)
                            r = ((+k["fill-opacity"] + 1 || 2) - 1) * ((+k.opacity + 1 || 2) - 1) * ((+a.getRGB(d.fill).o + 1 || 2) - 1),
                            r = F(h(r, 0), 1),
                            m.opacity = r,
                            m.src && (m.color = "none");
                        l.appendChild(m);
                        m = l.getElementsByTagName("stroke") && l.getElementsByTagName("stroke")[0];
                        n = !1;
                        !m && (n = m = V("stroke"));
                        (d.stroke && "none" != d.stroke || d["stroke-width"] || null != d["stroke-opacity"] || d["stroke-dasharray"] || d["stroke-miterlimit"] || d["stroke-linejoin"] || d["stroke-linecap"]) && (m.on = !0);
                        "none" != d.stroke && null !== d.stroke && null != m.on && 0 != d.stroke && 0 != d["stroke-width"] || (m.on = !1);
                        r = a.getRGB(d.stroke);
                        m.on && d.stroke && (m.color = r.hex);
                        r = ((+k["stroke-opacity"] + 1 || 2) - 1) * ((+k.opacity + 1 || 2) - 1) * ((+r.o + 1 || 2) - 1);
                        p = .75 * (e(d["stroke-width"]) || 1);
                        if (r = F(h(r, 0), 1),
                        null == d["stroke-width"] && (p = k["stroke-width"]),
                        d["stroke-width"] && (m.weight = p),
                        p && 1 > p && (r *= p) && (m.weight = 1),
                        m.opacity = r,
                        d["stroke-linejoin"] && (m.joinstyle = d["stroke-linejoin"] || "miter"),
                        m.miterlimit = d["stroke-miterlimit"] || 8,
                        d["stroke-linecap"] && (m.endcap = "butt" == d["stroke-linecap"] ? "flat" : "square" == d["stroke-linecap"] ? "square" : "round"),
                        "stroke-dasharray"in d)
                            r = {
                                "-": "shortdash",
                                ".": "shortdot",
                                "-.": "shortdashdot",
                                "-..": "shortdashdotdot",
                                ". ": "dot",
                                "- ": "dash",
                                "--": "longdash",
                                "- .": "dashdot",
                                "--.": "longdashdot",
                                "--..": "longdashdotdot"
                            },
                            m.dashstyle = r.hasOwnProperty(d["stroke-dasharray"]) ? r[d["stroke-dasharray"]] : "";
                        n && l.appendChild(m)
                    }
                    if ("text" == b.type) {
                        b.paper.canvas.style.display = "";
                        l = b.paper.span;
                        n = k.font && k.font.match(/\d+(?:\.\d*)?(?=px)/);
                        m = l.style;
                        k.font && (m.font = k.font);
                        k["font-family"] && (m.fontFamily = k["font-family"]);
                        k["font-weight"] && (m.fontWeight = k["font-weight"]);
                        k["font-style"] && (m.fontStyle = k["font-style"]);
                        n = e(k["font-size"] || n && n[0]) || 10;
                        m.fontSize = 100 * n + "px";
                        b.textpath.string && (l.innerHTML = c(b.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                        l = l.getBoundingClientRect();
                        b.W = k.w = (l.right - l.left) / 100;
                        b.H = k.h = (l.bottom - l.top) / 100;
                        b.X = k.x;
                        b.Y = k.y + b.H / 2;
                        ("x"in d || "y"in d) && (b.path.v = a.format("m{0},{1}l{2},{1}", f(21600 * k.x), f(21600 * k.y), f(21600 * k.x) + 1));
                        l = "x y text font font-family font-weight font-style font-size".split(" ");
                        m = 0;
                        for (n = l.length; m < n; m++)
                            if (l[m]in d) {
                                b._.dirty = 1;
                                break
                            }
                        switch (k["text-anchor"]) {
                        case "start":
                            b.textpath.style["v-text-align"] = "left";
                            b.bbx = b.W / 2;
                            break;
                        case "end":
                            b.textpath.style["v-text-align"] = "right";
                            b.bbx = -b.W / 2;
                            break;
                        default:
                            b.textpath.style["v-text-align"] = "center",
                            b.bbx = 0
                        }
                        b.textpath.style["v-text-kern"] = !0
                    }
                }, ea = function(b, f, h) {
                    b.attrs = b.attrs || {};
                    b.attrs;
                    var k = Math.pow
                      , l = "linear"
                      , n = ".5 .5";
                    if (b.attrs.gradient = f,
                    f = (f = c(f).replace(a._radial_gradient, function(a, b, c) {
                        return l = "radial",
                        b && c && (b = e(b),
                        c = e(c),
                        .25 < k(b - .5, 2) + k(c - .5, 2) && (c = d.sqrt(.25 - k(b - .5, 2)) * (2 * (.5 < c) - 1) + .5),
                        n = b + " " + c),
                        ""
                    })).split(/\s*\-\s*/),
                    "linear" == l) {
                        var r = f.shift();
                        if (r = -e(r),
                        isNaN(r))
                            return null
                    }
                    f = a._parseDots(f);
                    if (!f)
                        return null;
                    if (b = b.shape || b.node,
                    f.length) {
                        b.removeChild(h);
                        h.on = !0;
                        h.method = "none";
                        h.color = f[0].color;
                        h.color2 = f[f.length - 1].color;
                        for (var p = [], t = 0, u = f.length; t < u; t++)
                            f[t].offset && p.push(f[t].offset + " " + f[t].color);
                        h.colors = p.length ? p.join() : "0% " + h.color;
                        "radial" == l ? (h.type = "gradientTitle",
                        h.focus = "100%",
                        h.focussize = "0 0",
                        h.focusposition = n,
                        h.angle = 0) : (h.type = "gradient",
                        h.angle = (270 - r) % 360);
                        b.appendChild(h)
                    }
                    return 1
                }, aa = function(b, c) {
                    this[0] = this.node = b;
                    b.raphael = !0;
                    this.id = a._oid++;
                    b.raphaelid = this.id;
                    this.Y = this.X = 0;
                    this.attrs = {};
                    this.paper = c;
                    this.matrix = a.matrix();
                    this._ = {
                        transform: [],
                        sx: 1,
                        sy: 1,
                        dx: 0,
                        dy: 0,
                        deg: 0,
                        dirty: 1,
                        dirtyT: 1
                    };
                    !c.bottom && (c.bottom = this);
                    (this.prev = c.top) && (c.top.next = this);
                    c.top = this;
                    this.next = null
                }, n = a.el;
                aa.prototype = n;
                n.constructor = aa;
                n.transform = function(b) {
                    if (null == b)
                        return this._.transform;
                    var d, e = this.paper._viewBoxShift, f = e ? "s" + [e.scale, e.scale] + "-1-1t" + [e.dx, e.dy] : "";
                    e && (d = b = c(b).replace(/\.{3}|\u2026/g, this._.transform || ""));
                    a._extractTransform(this, f + b);
                    var h;
                    e = this.matrix.clone();
                    f = this.skew;
                    b = this.node;
                    var n = ~c(this.attrs.fill).indexOf("-")
                      , p = !c(this.attrs.fill).indexOf("url(");
                    (e.translate(1, 1),
                    p || n || "image" == this.type) ? (f.matrix = "1 0 0 1",
                    f.offset = "0 0",
                    h = e.split(),
                    n && h.noRotation || !h.isSimple) ? (b.style.filter = e.toFilter(),
                    e = this.getBBox(),
                    f = this.getBBox(1),
                    h = e.x - f.x,
                    e = e.y - f.y,
                    b.coordorigin = -21600 * h + " " + -21600 * e,
                    Q(this, 1, 1, h, e, 0)) : (b.style.filter = "",
                    Q(this, h.scalex, h.scaley, h.dx, h.dy, h.rotate)) : (b.style.filter = "",
                    f.matrix = c(e),
                    f.offset = e.offset());
                    return null !== d && (this._.transform = d,
                    a._extractTransform(this, d)),
                    this
                }
                ;
                n.rotate = function(a, d, f) {
                    if (this.removed)
                        return this;
                    if (null != a) {
                        if ((a = c(a).split(y)).length - 1 && (d = e(a[1]),
                        f = e(a[2])),
                        a = e(a[0]),
                        null == f && (d = f),
                        null == d || null == f)
                            f = this.getBBox(1),
                            d = f.x + f.width / 2,
                            f = f.y + f.height / 2;
                        return this._.dirtyT = 1,
                        this.transform(this._.transform.concat([["r", a, d, f]])),
                        this
                    }
                }
                ;
                n.translate = function(a, d) {
                    return this.removed ? this : ((a = c(a).split(y)).length - 1 && (d = e(a[1])),
                    a = e(a[0]) || 0,
                    d = +d || 0,
                    this._.bbox && (this._.bbox.x += a,
                    this._.bbox.y += d),
                    this.transform(this._.transform.concat([["t", a, d]])),
                    this)
                }
                ;
                n.scale = function(a, d, f, h) {
                    if (this.removed)
                        return this;
                    if ((a = c(a).split(y)).length - 1 && (d = e(a[1]),
                    f = e(a[2]),
                    h = e(a[3]),
                    isNaN(f) && (f = null),
                    isNaN(h) && (h = null)),
                    a = e(a[0]),
                    null == d && (d = a),
                    null == h && (f = h),
                    null == f || null == h)
                        var b = this.getBBox(1);
                    return f = null == f ? b.x + b.width / 2 : f,
                    h = null == h ? b.y + b.height / 2 : h,
                    this.transform(this._.transform.concat([["s", a, d, f, h]])),
                    this._.dirtyT = 1,
                    this
                }
                ;
                n.hide = function() {
                    return !this.removed && (this.node.style.display = "none"),
                    this
                }
                ;
                n.show = function() {
                    return !this.removed && (this.node.style.display = ""),
                    this
                }
                ;
                n.auxGetBBox = a.el.getBBox;
                n.getBBox = function() {
                    var a = this.auxGetBBox();
                    if (this.paper && this.paper._viewBoxShift) {
                        var c = {}
                          , d = 1 / this.paper._viewBoxShift.scale;
                        return c.x = a.x - this.paper._viewBoxShift.dx,
                        c.x *= d,
                        c.y = a.y - this.paper._viewBoxShift.dy,
                        c.y *= d,
                        c.width = a.width * d,
                        c.height = a.height * d,
                        c.x2 = c.x + c.width,
                        c.y2 = c.y + c.height,
                        c
                    }
                    return a
                }
                ;
                n._getBBox = function() {
                    return this.removed ? {} : {
                        x: this.X + (this.bbx || 0) - this.W / 2,
                        y: this.Y - this.H,
                        width: this.W,
                        height: this.H
                    }
                }
                ;
                n.remove = function() {
                    if (!this.removed && this.node.parentNode) {
                        for (var b in this.paper.__set__ && this.paper.__set__.exclude(this),
                        a.eve.unbind("raphael.*.*." + this.id),
                        a._tear(this, this.paper),
                        this.node.parentNode.removeChild(this.node),
                        this.shape && this.shape.parentNode.removeChild(this.shape),
                        this)
                            this[b] = "function" == typeof this[b] ? a._removedFactory(b) : null;
                        this.removed = !0
                    }
                }
                ;
                n.attr = function(b, c) {
                    if (this.removed)
                        return this;
                    if (null == b) {
                        b = {};
                        for (var d in this.attrs)
                            this.attrs.hasOwnProperty(d) && (b[d] = this.attrs[d]);
                        return b.gradient && "none" == b.fill && (b.fill = b.gradient) && delete b.gradient,
                        b.transform = this._.transform,
                        b
                    }
                    if (null == c && a.is(b, "string")) {
                        if ("fill" == b && "none" == this.attrs.fill && this.attrs.gradient)
                            return this.attrs.gradient;
                        d = b.split(y);
                        for (var e = {}, f = 0, h = d.length; f < h; f++)
                            (b = d[f])in this.attrs ? e[b] = this.attrs[b] : a.is(this.paper.customAttributes[b], "function") ? e[b] = this.paper.customAttributes[b].def : e[b] = a._availableAttrs[b];
                        return h - 1 ? e : e[d[0]]
                    }
                    if (this.attrs && null == c && a.is(b, "array")) {
                        e = {};
                        f = 0;
                        for (h = b.length; f < h; f++)
                            e[b[f]] = this.attr(b[f]);
                        return e
                    }
                    for (f in null != c && ((e = {})[b] = c),
                    null == c && a.is(b, "object") && (e = b),
                    e)
                        T("raphael.attr." + f + "." + this.id, this, e[f]);
                    if (e) {
                        for (f in this.paper.customAttributes)
                            if (this.paper.customAttributes.hasOwnProperty(f) && e.hasOwnProperty(f) && a.is(this.paper.customAttributes[f], "function"))
                                for (h in b = this.paper.customAttributes[f].apply(this, [].concat(e[f])),
                                this.attrs[f] = e[f],
                                b)
                                    b.hasOwnProperty(h) && (e[h] = b[h]);
                        e.text && "text" == this.type && (this.textpath.string = e.text);
                        W(this, e)
                    }
                    return this
                }
                ;
                n.toFront = function() {
                    return !this.removed && this.node.parentNode.appendChild(this.node),
                    this.paper && this.paper.top != this && a._tofront(this, this.paper),
                    this
                }
                ;
                n.toBack = function() {
                    return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild),
                    a._toback(this, this.paper)),
                    this)
                }
                ;
                n.insertAfter = function(b) {
                    return this.removed ? this : (b.constructor == a.st.constructor && (b = b[b.length - 1]),
                    b.node.nextSibling ? b.node.parentNode.insertBefore(this.node, b.node.nextSibling) : b.node.parentNode.appendChild(this.node),
                    a._insertafter(this, b, this.paper),
                    this)
                }
                ;
                n.insertBefore = function(b) {
                    return this.removed ? this : (b.constructor == a.st.constructor && (b = b[0]),
                    b.node.parentNode.insertBefore(this.node, b.node),
                    a._insertbefore(this, b, this.paper),
                    this)
                }
                ;
                n.blur = function(b) {
                    var c = this.node.runtimeStyle
                      , d = c.filter;
                    return d = d.replace(p, ""),
                    0 != +b ? (this.attrs.blur = b,
                    c.filter = d + "  progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+b || 1.5) + ")",
                    c.margin = a.format("-{0}px 0 0 -{0}px", f(+b || 1.5))) : (c.filter = d,
                    c.margin = 0,
                    delete this.attrs.blur),
                    this
                }
                ;
                a._engine.path = function(a, c) {
                    var b = V("shape");
                    b.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)";
                    b.coordsize = "21600 21600";
                    b.coordorigin = c.coordorigin;
                    var d = new aa(b,c)
                      , e = {
                        fill: "none",
                        stroke: "#000"
                    };
                    a && (e.path = a);
                    d.type = "path";
                    d.path = [];
                    d.Path = "";
                    W(d, e);
                    c.canvas && c.canvas.appendChild(b);
                    a = V("skew");
                    return a.on = !0,
                    b.appendChild(a),
                    d.skew = a,
                    d.transform(""),
                    d
                }
                ;
                a._engine.rect = function(b, c, d, e, f, h) {
                    var k = a._rectPath(c, d, e, f, h);
                    b = b.path(k);
                    var l = b.attrs;
                    return b.X = l.x = c,
                    b.Y = l.y = d,
                    b.W = l.width = e,
                    b.H = l.height = f,
                    l.r = h,
                    l.path = k,
                    b.type = "rect",
                    b
                }
                ;
                a._engine.ellipse = function(a, c, d, e, f) {
                    a = a.path();
                    a.attrs;
                    return a.X = c - e,
                    a.Y = d - f,
                    a.W = 2 * e,
                    a.H = 2 * f,
                    a.type = "ellipse",
                    W(a, {
                        cx: c,
                        cy: d,
                        rx: e,
                        ry: f
                    }),
                    a
                }
                ;
                a._engine.circle = function(a, c, d, e) {
                    a = a.path();
                    a.attrs;
                    return a.X = c - e,
                    a.Y = d - e,
                    a.W = a.H = 2 * e,
                    a.type = "circle",
                    W(a, {
                        cx: c,
                        cy: d,
                        r: e
                    }),
                    a
                }
                ;
                a._engine.image = function(b, c, d, e, f, h) {
                    var k = a._rectPath(d, e, f, h);
                    b = b.path(k).attr({
                        stroke: "none"
                    });
                    var l = b.attrs
                      , m = b.node
                      , n = m.getElementsByTagName("fill")[0];
                    return l.src = c,
                    b.X = l.x = d,
                    b.Y = l.y = e,
                    b.W = l.width = f,
                    b.H = l.height = h,
                    l.path = k,
                    b.type = "image",
                    n.parentNode == m && m.removeChild(n),
                    n.rotate = !0,
                    n.src = c,
                    n.type = "tile",
                    b._.fillpos = [d, e],
                    b._.fillsize = [f, h],
                    m.appendChild(n),
                    Q(b, 1, 1, 0, 0, 0),
                    b
                }
                ;
                a._engine.text = function(b, d, e, h) {
                    var k = V("shape")
                      , l = V("path")
                      , n = V("textpath");
                    d = d || 0;
                    e = e || 0;
                    h = h || "";
                    l.v = a.format("m{0},{1}l{2},{1}", f(21600 * d), f(21600 * e), f(21600 * d) + 1);
                    l.textpathok = !0;
                    n.string = c(h);
                    n.on = !0;
                    k.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)";
                    k.coordsize = "21600 21600";
                    k.coordorigin = "0 0";
                    var p = new aa(k,b)
                      , q = {
                        fill: "#000",
                        stroke: "none",
                        font: a._availableAttrs.font,
                        text: h
                    };
                    p.shape = k;
                    p.path = l;
                    p.textpath = n;
                    p.type = "text";
                    p.attrs.text = c(h);
                    p.attrs.x = d;
                    p.attrs.y = e;
                    p.attrs.w = 1;
                    p.attrs.h = 1;
                    W(p, q);
                    k.appendChild(n);
                    k.appendChild(l);
                    b.canvas.appendChild(k);
                    b = V("skew");
                    return b.on = !0,
                    k.appendChild(b),
                    p.skew = b,
                    p.transform(""),
                    p
                }
                ;
                a._engine.setSize = function(b, c) {
                    var d = this.canvas.style;
                    return this.width = b,
                    this.height = c,
                    b == +b && (b += "px"),
                    c == +c && (c += "px"),
                    d.width = b,
                    d.height = c,
                    d.clip = "rect(0 " + b + " " + c + " 0)",
                    this._viewBox && a._engine.setViewBox.apply(this, this._viewBox),
                    this
                }
                ;
                a._engine.setViewBox = function(b, c, d, e, f) {
                    a.eve("raphael.setViewBox", this, this._viewBox, [b, c, d, e, f]);
                    var h, k, l = this.getSize(), m = l.width, n = l.height;
                    return f && (d * (h = n / e) < m && (b -= (m - d * h) / 2 / h),
                    e * (k = m / d) < n && (c -= (n - e * k) / 2 / k)),
                    this._viewBox = [b, c, d, e, !!f],
                    this._viewBoxShift = {
                        dx: -b,
                        dy: -c,
                        scale: l
                    },
                    this.forEach(function(a) {
                        a.transform("...")
                    }),
                    this
                }
                ;
                a._engine.initWin = function(a) {
                    var b = a.document;
                    31 > b.styleSheets.length ? b.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)") : b.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
                    try {
                        !b.namespaces.rvml && b.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                        V = function(a) {
                            return b.createElement("<rvml:" + a + ' class="rvml">')
                        }
                    } catch (l) {
                        V = function(a) {
                            return b.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                        }
                    }
                }
                ;
                a._engine.initWin(a._g.win);
                a._engine.create = function() {
                    var b = a._getContainer.apply(0, arguments)
                      , c = b.container
                      , d = b.height
                      , e = b.width
                      , f = b.x;
                    b = b.y;
                    if (!c)
                        throw Error("VML container not found.");
                    var h = new a._Paper
                      , n = h.canvas = a._g.doc.createElement("div")
                      , p = n.style;
                    return f = f || 0,
                    b = b || 0,
                    e = e || 512,
                    d = d || 342,
                    h.width = e,
                    h.height = d,
                    e == +e && (e += "px"),
                    d == +d && (d += "px"),
                    h.coordsize = "21600000 21600000",
                    h.coordorigin = "0 0",
                    h.span = a._g.doc.createElement("span"),
                    h.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",
                    n.appendChild(h.span),
                    p.cssText = a.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", e, d),
                    1 == c ? (a._g.doc.body.appendChild(n),
                    p.left = f + "px",
                    p.top = b + "px",
                    p.position = "absolute") : c.firstChild ? c.insertBefore(n, c.firstChild) : c.appendChild(n),
                    h.renderfix = function() {}
                    ,
                    h
                }
                ;
                a.prototype.clear = function() {
                    a.eve("raphael.clear", this);
                    this.canvas.innerHTML = "";
                    this.span = a._g.doc.createElement("span");
                    this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                    this.canvas.appendChild(this.span);
                    this.bottom = this.top = null
                }
                ;
                a.prototype.remove = function() {
                    for (var b in a.eve("raphael.remove", this),
                    this.canvas.parentNode.removeChild(this.canvas),
                    this)
                        this[b] = "function" == typeof this[b] ? a._removedFactory(b) : null;
                    return !0
                }
                ;
                var ha = a.st, P;
                for (P in n)
                    n.hasOwnProperty(P) && !ha.hasOwnProperty(P) && (ha[P] = function(a) {
                        return function() {
                            var b = arguments;
                            return this.forEach(function(c) {
                                c[a].apply(c, b)
                            })
                        }
                    }(P))
            }
        }
        .apply(e, h)) || (a.exports = f)
    }
    ])
});
this.JSON || (this.JSON = {});
(function() {
    function a(a) {
        return 10 > a ? "0" + a : a
    }
    function e(a) {
        d.lastIndex = 0;
        return d.test(a) ? '"' + a.replace(d, function(a) {
            var c = z[a];
            return "string" === typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function h(a, d) {
        var f = c
          , y = d[a];
        y && "object" === typeof y && "function" === typeof y.toJSON && (y = y.toJSON(a));
        "function" === typeof E && (y = E.call(d, a, y));
        switch (typeof y) {
        case "string":
            return e(y);
        case "number":
            return isFinite(y) ? String(y) : "null";
        case "boolean":
        case "null":
            return String(y);
        case "object":
            if (!y)
                return "null";
            c += x;
            var z = [];
            if ("[object Array]" === Object.prototype.toString.apply(y)) {
                var F = y.length;
                for (a = 0; a < F; a += 1)
                    z[a] = h(a, y) || "null";
                d = 0 === z.length ? "[]" : c ? "[\n" + c + z.join(",\n" + c) + "\n" + f + "]" : "[" + z.join(",") + "]";
                c = f;
                return d
            }
            if (E && "object" === typeof E)
                for (F = E.length,
                a = 0; a < F; a += 1) {
                    var u = E[a];
                    "string" === typeof u && (d = h(u, y)) && z.push(e(u) + (c ? ": " : ":") + d)
                }
            else
                for (u in y)
                    Object.hasOwnProperty.call(y, u) && (d = h(u, y)) && z.push(e(u) + (c ? ": " : ":") + d);
            d = 0 === z.length ? "{}" : c ? "{\n" + c + z.join(",\n" + c) + "\n" + f + "}" : "{" + z.join(",") + "}";
            c = f;
            return d
        }
    }
    "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function(c) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
    }
    ,
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
        return this.valueOf()
    }
    );
    var f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, d = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c, x, z = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, E;
    "function" !== typeof JSON.stringify && (JSON.stringify = function(a, d, e) {
        var f;
        x = c = "";
        if ("number" === typeof e)
            for (f = 0; f < e; f += 1)
                x += " ";
        else
            "string" === typeof e && (x = e);
        if ((E = d) && "function" !== typeof d && ("object" !== typeof d || "number" !== typeof d.length))
            throw Error("JSON.stringify");
        return h("", {
            "": a
        })
    }
    );
    "function" !== typeof JSON.parse && (JSON.parse = function(a, c) {
        function d(a, e) {
            var f, h = a[e];
            if (h && "object" === typeof h)
                for (f in h)
                    if (Object.hasOwnProperty.call(h, f)) {
                        var p = d(h, f);
                        void 0 !== p ? h[f] = p : delete h[f]
                    }
            return c.call(a, e, h)
        }
        f.lastIndex = 0;
        f.test(a) && (a = a.replace(f, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return a = eval("(" + a + ")"),
            "function" === typeof c ? d({
                "": a
            }, "") : a;
        throw new SyntaxError("JSON.parse");
    }
    )
}
)();
