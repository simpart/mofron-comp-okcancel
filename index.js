/**
 * @file  mofron-comp-okcancel/index.js
 * @brief extend line component for mofron
 * @license MIT
 */
const HrzPos  = require('mofron-effect-hrzpos');
const Text    = require('mofron-comp-text');
const Button  = require('mofron-comp-button');
const Click   = require('mofron-event-click');
const comutl  = mofron.util.common;
const ConfArg = mofron.class.ConfArg;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) ratio parameter
     *                key-value: component option
     * @type private
     */
    constructor (p1,p2) {
        try {
            super();
            this.modname("OKCancel");
	    this.shortForm('text');
            this.confmng().add('clickEvent', { type:'event', list:true });
	    /* set config */
	    if (0 < arguments.length) {
                this.config(p1,p2);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.rootDom()[0].style({
                'position': 'absolute',
		'bottom':   '0.3rem',
		'display':  'flex'
            });
            this.effect(new HrzPos());
	    this.ok('OK');
	    this.cancel('Cancel');
            this.child([ this.cancel(),this.ok() ]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    clickEvent (fnc,prm) {
        try {
	    if (undefined === fnc) {
                return this.confmng('clickEvent');
	    }
            this.confmng('clickEvent', [fnc,prm]);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    execEvent (p1,p2,p3) {
        try {
            let evt = p3.comp.clickEvent();
	    for (let eidx in evt) {
                evt[eidx][0](p3.comp, p3.type, evt[eidx][1]);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    text (ok, cancel) {
        try {
            this.ok(ok);
	    this.cancel(cancel);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    cancel (prm) {
        try {
	    if ('string' === typeof prm) {
	        this.cancel().text(prm);
                return;
	    } else if (true === comutl.isinc(prm,'Text')) {
                prm.config({
		    mainColor:'blue', size:'0.18rem', width:'1.2rem',
		    event: new Click(
		               new ConfArg(this.execEvent, { comp:this, type:false })
			   )
                });
	    }
            return this.innerComp('cancel', prm, Text);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    ok (prm) {
        try {
	    if ('string' === typeof prm) {
	        this.ok().text(prm);
                return;
	    } else if (true === comutl.isinc(prm,'Button')) {
                prm.config({
		    size: new ConfArg('1.8rem','0.28rem'),
		    clickEvent: new ConfArg(this.execEvent, { comp:this, type:true })
		});
	    }
            return this.innerComp('ok', prm, Button);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
}
/* end of file */
