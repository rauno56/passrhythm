Ext = {};

Ext.apply = function(o, c){
    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }
    return o;
};

Ext.apply(Ext, {
	extend : function(){
        // inline overrides
        var io = function(o){
            for(var m in o){
                this[m] = o[m];
            }
        };
        var oc = Object.prototype.constructor;

        return function(sb, sp, overrides){
            if(Ext.isObject(sp)){
                overrides = sp;
                sp = sb;
                sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
            }
            var F = function(){},
                sbp,
                spp = sp.prototype;

            F.prototype = spp;
            sbp = sb.prototype = new F();
            sbp.constructor=sb;
            sb.superclass=spp;
            if(spp.constructor == oc){
                spp.constructor=sp;
            }
            sb.override = function(o){
                Ext.override(sb, o);
            };
            sbp.superclass = sbp.supr = (function(){
                return spp;
            });
            sbp.override = io;
            Ext.override(sb, overrides);
            sb.extend = function(o){return Ext.extend(sb, o);};
            return sb;
        };
    }(),
    isObject : function(v){
        return !!v && Object.prototype.toString.call(v) === '[object Object]';
    },
    override : function(origclass, overrides){
        if(overrides){
            var p = origclass.prototype;
            Ext.apply(p, overrides);
            if(Ext.isIE && overrides.hasOwnProperty('toString')){
                p.toString = overrides.toString;
            }
        }
    }
});