Array.prototype.each = function( callback ) {
    var context = this;
    for( var i = 0; i < context.length; i++ ) {
        callback( context[ i ] );
    }
}
Array.prototype.map = function( filter ) {
    var context = this,
        retVal  = [];
    for( var i = 0; i < context.length; i++ ) {
        var element   = context[ i ],
            filtered  = filter( element );
        retVal.push( filtered );
    }
    return retVal;
}
Array.prototype.sortWith = function( algorithm ) {
    var context = this;
    algorithm = ( algorithm ) || "quicksort";
    switch( algorithm.toLowerCase() ) {
        default:
        case "quicksort":
            var swap = function( items, firstIndex, secondIndex ){
                var temp = items[ firstIndex ];
                items[ firstIndex ] = items[ secondIndex ];
                items[ secondIndex ] = temp;
            }
            var partition = function( items, left, right ) {
                var pivot   = items[ Math.floor( ( right + left ) / 2 ) ],
                    i       = left,
                    j       = right;
                while ( i <= j ) {
                    while ( items[ i ] < pivot ) {
                        i++;
                    }
                    while ( items[ j ] > pivot ) {
                        j--;
                    }
                    if ( i <= j ) {
                        swap( items, i, j );
                        i++;
                        j--;
                    }
                }
                return i;
            }
            var quickSort = function( items, left, right ) {
                var index;
                if (items.length > 1) {
                    left = typeof left != "number" ? 0 : left;
                    right = typeof right != "number" ? items.length - 1 : right;
                    index = partition( items, left, right );
                    if ( left < index - 1 ) {
                        quickSort( items, left, index - 1 );
                    }
                    if ( index < right ) {
                        quickSort( items, index, right );
                    }
                }
                return items;
            }
            return quickSort( context );
            break;
        case "bubblesort":
            var temp,
                arr = context;
            for( var i = 0; i < context.length; i++ ) {
                for( var j = i; j > 0; j-- ) {
                    if( arr[ j ] < arr[ j - 1 ] ) {
                        temp = arr[ j ];
                        arr[ j ] = arr[ j - 1 ];
                        arr[ j - 1 ] = temp;
                    }
                }
            }
            return arr;
            break;
    }
}
Array.prototype.sort = function() {
    return ( Array.prototype.sortWith.call( this ) );
}
Array.prototype.indexOf = function( item, isSorted ) {
    var binarySearch = function( array, item ) {
        var left  = 0,
    		right = array.length - 1,
    		mid,
    		element;
    	while( left <= right ) {
    		mid = Math.floor( ( left + right ) / 2, 10 );
    		element = array[ mid ];
    		if ( element < item  ) {
    			left = mid + 1;
    		} else if (element > item ) {
    			right = mid - 1;
    		} else {
    			return mid;
    		}
    	}
    	return -1;
    }
    return ( isSorted ) ? binarySearch( this, item ) : binarySearch( Array.prototype.sort.call( this ), item );
}
Array.prototype.first = function( numberOfElements ) {
    if ( !numberOfElements ){
        return this[ 0 ];
    } else {
        var count = ( numberOfElements == this.length ) ? numberOfElements - 1 : numberOfElements,
            ret   = [];
        for( var i = 0; i < count; i++) {
            ret.push( this[ i ] );
        }
        return ret;
    }
}
Array.prototype.last = function( numberOfElements ) {
    if ( !numberOfElements ){
        return this[ this.length - 1 ];
    } else {
        var count = ( numberOfElements == this.length ) ? numberOfElements - 1 : numberOfElements,
            ret   = [];
        for( var i = this.length - numberOfElements; i < this.length; i++) {
            ret.push( this[ i ] );
        }
        return ret;
    }
}
Array.prototype.flatten = function() {
    var ret = [],
        flat = function( element ) {
            for( var i = 0; i < element.length; i++ ) {
                var currentElement = element[ i ];
                if ( Array.prototype.isArray.call( this, currentElement ) ) {
                    flat( currentElement );
                } else {
                    ret.push( currentElement );
                }
            }
        };
    for( var i = 0; i < this.length; i++ ) {
        var currentElement = this[ i ];
        if ( Array.prototype.isArray.call( this, currentElement ) ) {
            flat( currentElement );
        } else {
            ret.push( currentElement );
        }
    }
    return ret;
}
Array.prototype.clean = function() {
    var ret = [];
    for( var i = 0; i < this.length; i++ ) {
        var current = this[ i ];
        if ( current === false ||
             current === 0 ||
             current === "" ||
             current === null ||
             current === undefined ||
             isNaN( current ) ) {
             continue;
         } else { ret.push( current ); }
    }
    return ret;
}
Array.prototype.exists = function( element ) {
    return Array.prototype.indexOf.call( this, element ) > -1;
}
Array.prototype.union = function( secondArray ) {
    var ret     = this;
    for( var j = 0; j < arguments.length; j++ ) {
        var arr = arguments[ j ];
        for( var i = 0; i < arr.length; i++ ) {
            var current = arr[ i ];
            if( !ret.exists( current ) ){ ret.push( current ); }
        }
    }
    return ret;
}
Array.prototype.intersect = function( secondArray ) {
    var ret = [],
        arr = [];
    for( var i = 0; i < arguments.length; i++ ) {
        var current = arguments[ i ];
        if( Array.prototype.isArray.call( this, current ) ) {
            arr.push( current );
        }
    }
    var arx = arr.flatten().removeDuplicates();
    for( var i = 0; i < this.length; i++ ) {
        var current = this[ i ];
        if( Array.prototype.exists.call( arx, this[ i ] ) ) { ret.push( current ); }
    }
    return ret;
}
Array.prototype.removeDuplicates = function() {
    var ret = [];
outer:  for( var i = 0; i < this.length; i++ ) {
        for( var j = ( i + 1 ); j < this.length; j++ ) {
            if ( ( this[ i ] === this[ j ] ) ) { continue outer; }
        }
        ret.push( this[ i ] );
    }
    return ret;
}
Array.prototype.atRandom = function( length ) {
    var getRandom = function( start, end ) {
        return ( Math.floor( Math.random() * ( start - end + 1 ) + end ) );
    }
    if ( !length ) {
        return this[ getRandom( 0, this.length - 1 ) ];
    } else {
        var ret = [];
        for( var i = 0; i < length; i++ ) {
            ret.push( this[ getRandom( 0, this.length - 1 ) ] );
        }
        return ret;
    }
}
Array.prototype.isArray = function( arr ) {
    return( Object.prototype.toString.call( arr ) === '[object Array]' );
}

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

window.goBack = function() {
    this.goBackToDepth( -1 );
}
window.goBackToDepth = function( depth ) {
    if ( !( history || false ) ) {
        console.log( "Extendere.js ERROR: The current browser does not support the 'history' object." );
        return;
    }
    history.back( depth );
}
window.onDomReady = function( callback ) {
    document.addEventListener('DOMContentLoaded', function() {
        callback();
    });
}
window.getReferrer = function() {
    return ( document.referrer );
}
window.wasReferredFrom = function( referredFrom ) {
    return ( document.referrer === referredFrom );
}
window.isValidUri = function( uri ) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( uri );
}
