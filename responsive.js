if( typeof window.randaffilistX45 === 'undefined' ) {
    window.randaffilistX45 = 'exists';
    window.addEventListener( 'message', function( event ) {
	//console.log(event);
	if( height = event.data['height'] ) {
	    // console.log(event.data);
	    document.getElementById( event.data['id'] ).height = height;
	    document.getElementById( event.data['id'] ).width = event.data['width'];
	    if( event.data['style'] ) {
		document.getElementById( event.data['id'] ).style = event.data['style'];
	    }
	}
    } );

    function ReplaceWithPolyfill() {
	'use-strict'; // For safari, and IE > 10
	var parent = this.parentNode, i = arguments.length, currentNode;
	if( !parent )
	    return;
	if( !i ) // if there are no arguments
	    parent.removeChild( this );
	while( i-- ) { // i-- decrements i and returns the value of i before the decrement
	    currentNode = arguments[i];
	    if( typeof currentNode !== 'object' ) {
		currentNode = this.ownerDocument.createTextNode( currentNode );
	    } else if( currentNode.parentNode ) {
		currentNode.parentNode.removeChild( currentNode );
	    }
	    // the value of "i" below is after the decrement
	    if( !i ) // if currentNode is the first argument (currentNode === arguments[0])
		parent.replaceChild( currentNode, this );
	    else // if currentNode isn't the first
		parent.insertBefore( currentNode, this.previousSibling );
	}
    }
    if( !Element.prototype.replaceWith )
	Element.prototype.replaceWith = ReplaceWithPolyfill;
    if( !CharacterData.prototype.replaceWith )
	CharacterData.prototype.replaceWith = ReplaceWithPolyfill;
    if( !DocumentType.prototype.replaceWith )
	DocumentType.prototype.replaceWith = ReplaceWithPolyfill;



    window.affilistStart = function() {

	var a = [];
	[].forEach.call( document.getElementsByTagName( 'ins' ), function( o, e ) {
	    a[e] = o
	} ), a.forEach( function( a, o ) {
	    if( !a.getAttribute( 'data-affquery' ) )
		return;
	    var e = o + "_" + Math.floor( 1e4 * Math.random() ), t = document.createElement( "iframe" );
	    t.width = a.getAttribute( 'data-width' ), t.height = a.getAttribute( 'data-height' );
	    var r = {frameborder: 0, marginheight: 0, marginwidth: 0, id: e, referrerpolicy: "unsafe-url", scrolling: "no", sandbox: "allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts", "data-id": e};
	    for( var n in r )
		t.setAttribute( n, r[n] );

	    if( a.getAttribute( 'data-max_width' ) ) {
		var maxw = a.getAttribute( 'data-max_width' );
	    } else
	    {
		var maxw = a.parentElement.clientWidth;
	    }

	    var limitWidthString = '';

	    if( a.getAttribute( 'data-max_height' ) ) {
		limitWidthString = '&maxh=' + a.getAttribute( 'data-max_height' );
	    }

	    var date = new Date();
	    var dateStr =
		    ("00" + (date.getMonth() + 1)).slice( -2 ) + "/" +
		    ("00" + date.getDate()).slice( -2 ) + "/" +
		    date.getFullYear() + " " +
		    ("00" + date.getHours()).slice( -2 ) + ":" +
		    ("00" + date.getMinutes()).slice( -2 ) + ":" +
		    ("00" + date.getSeconds()).slice( -2 );

	    var time = '&time=' + encodeURIComponent( dateStr );


	    var affQuery = a.getAttribute( 'data-affquery' );

	    if( a.getAttribute( 'data-affquery' ).indexOf( '/' ) !== 0 ) {
		affQuery = "/" + affQuery;
	    }

	    if( o === 0 ) {
		affQuery = affQuery + '&is_first=true';
	    }


	    function isElementInViewport( el ) {


		var rect = el.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
	    }


	    function onVisibilityChange( el, affQuery, a ) {
		if( el === null ) {
		    return;
		}
		var was_visible = false;
		return function() {
		    try {
			var visible = isElementInViewport( el ) && el.checkVisibility( {contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true} );

			if( visible && was_visible === false ) {
			    was_visible = true;
			    /*
			     var element = document.getElementById( 'console' );
			     element.innerHTML += "calling api for<br>"
			     */

			    let xhr = new XMLHttpRequest();


			    let url = a.getAttribute( 'data-domain' ) + affQuery + '&log_shown=true';
			    xhr.open( "GET", url, true );


			    xhr.send();

			}
		    } catch(e) {

		    }
		}
	    }

	    var handlerChecked = onVisibilityChange( t, affQuery, a );
	    t.onload = handlerChecked;
	    t.src = a.getAttribute( 'data-domain' ) + affQuery + "&randomA=" + e + "&maxw=" + maxw + limitWidthString + time, a.replaceWith( t )





	    if( window.addEventListener ) {
		addEventListener( 'DOMContentLoaded', handlerChecked, false );
		addEventListener( 'load', handlerChecked, false );
		addEventListener( 'scroll', handlerChecked, false );
		addEventListener( 'resize', handlerChecked, false );
	    } else if( window.attachEvent ) {
		attachEvent( 'onDOMContentLoaded', handlerChecked ); // Internet Explorer 9+ :(
		attachEvent( 'onload', handlerChecked );
		attachEvent( 'onscroll', handlerChecked );
		attachEvent( 'onresize', handlerChecked );
	    }




	} )
    }








    window.addEventListener( 'load', function() {
	window.affilistStart();
    } )

}
