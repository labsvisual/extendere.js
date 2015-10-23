/*
 *      File Name: extendere.math.js
 *      File Description: Extends the built-in Math class.
 *
 *      File Version: 1.0.0
 */

var ExtendereMath = {

    E: 2.718281828459045,
    LN2: 0.6931471805599453,
    LN10: 2.302585092994046,
    LOG2E: 1.4426950408889634,
    LOG10E: 0.4342944819032518,
    PI: 3.141592653589793,
    SQRT1_2: 0.7071067811865476,
    SQRT2: 1.4142135623730951,

    abs: function( num ) {

        return ( num < 0 ) ? -num : num;

    },

    staticObject: window.Math || Math,

    exposeMath: function() {

        this.staticObject = window.Math || Math;
        window.math = math = ExtendereMath;

    },

    round: function( val, figures ) {

        figures = ( !figures ) ? 2 : figures;

        return Number( Math.round( val + 'e' + figures ) + 'e-' + figures );
    },

    toRadians: function( degrees, round ) {

        return this.round( ( Math.PI / 180 ) * degrees, round ) ;

    },

    toDegrees: function( radians, round ) {

        return this.round( ( 180 / Math.PI ) * radians, round ) ;

    }

};

ExtendereMath.exposeMath();
