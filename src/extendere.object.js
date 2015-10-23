/*
 *      File Name: extendere.object.js
 *      File Description: Contains the extension functions for the object class.
 *
 *      File Version: 1.0.0
 */


Object.prototype.allKeys = function() {

    return Object.keys( this );

}

Object.prototype.allValues = function() {

    var keys = Object.prototype.allKeys.call( this ),
        ret  = [];

    for( var i = 0; i < keys.length; i++ ) {
        ret.push( this[ keys[ i ] ] );
    }

    return ret;

}

Object.prototype.mapObject = function( filter ) {

    var keys   = Object.prototype.allKeys.call( this ),
        values = Object.prototype.allValues.call( this ),
        ret    = "";

    for( var i = 0; i < values.length; i++ ) {

        var key = keys[ i ],
            val = filter( key, values[ i ] ),
            escape = ( !( typeof val === "number" ) ) ? "\"" : "";

        ret += "\"" + key + "\"" + ":" + escape + val + escape + ",";

    }


    ret = ret.substring( 0, ret.length - 1 );
    ret = eval ( "({" + ret + "})" );

    return ret;

}

Object.prototype.extract = function() {

    var ret    = [],
        keys   = Object.prototype.allKeys.call( this ),
        values = Object.prototype.allValues.call( this );

    for( var i = 0; i < keys.length; i++ ) {

        var key = keys[ i ],
            val = values[ i ];

        var arr = [];

        arr.push( key );
        arr.push( val );

        ret.push( arr );

    }

    return ret;

}

Object.prototype.invert = function() {

    var keys   = Object.prototype.allKeys.call( this ),
        values = Object.prototype.allValues.call( this ),
        ret    = "";

    for( var i = 0; i < values.length; i++ ) {

        var key = keys[ i ],
            val = values[ i ];

        ret +=  val + ":\"" + key  + "\",";

    }

    ret = ret.substring( 0, ret.length - 1 );
    ret = eval ( "({" + ret + "})" );

    return ret;

}

Object.prototype.merge = function( secondObject ) {

    var keysOne   = Object.prototype.allKeys.call( this ),
        valuesOne = Object.prototype.allValues.call( this ),
        keysTwo   = Object.prototype.allKeys.call( secondObject ),
        valuesTwo = Object.prototype.allValues.call( secondObject ),
        ret       = "";

    for( var i = 0; i < valuesOne.length; i++ ) {

        var key = keysOne[ i ],
            val = valuesOne[ i ];

        if( keysTwo.exists( key ) ) { continue; }

        ret +=  val + ":\"" + key  + "\",";

    }

    for( var i = 0; i < valuesTwo.length; i++ ) {

        var key = keysTwo[ i ],
            val = valuesTwo[ i ];

        ret +=  val + ":\"" + key + "\",";

    }

    ret = ret.substring( 0, ret.length - 1 );
    ret = eval ( "({" + ret + "})" );

    return ret;

}
