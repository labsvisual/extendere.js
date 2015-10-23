/*
 *      File Name: extendere.window.js
 *      File Description: Contains the extension functions for the window element.
 *
 *      File Version: 1.0.0
 */

//"use strict";

var Extendere = {

    /*
        Go back a single page
    */
    goBack: function() {

        this.goBackToDepth( -1 );

    },

    /*
        Go back to the specified [depth] into history.
    */
    goBackToDepth: function( depth ) {

        if ( !( history || false ) ) {

            console.log( "Extendere.js ERROR: The current browser does not support the 'history' object." );
            return;

        }

        history.back( depth );

    },

    /*
        Check if the DOM has been loaded and parsed; if it is, call the callback.
    */
    onDomReady: function( callback ) {

        document.addEventListener('DOMContentLoaded', function() {
            callback();
        });

    }


}
