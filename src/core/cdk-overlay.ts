export function cdkOverlay(): Object {
    const zOverlay: number = 1000;

    return {
        '.cdk-overlay-container, .cdk-global-overlay-wrapper': {
            // Disable events from being captured on the overlay container.
            'pointer-events': 'none',
            // The container should be the size of the viewport.
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
        },
        // The overlay-container is an invisible element which contains all individual overlays.
        '.cdk-overlay-container': {
            position: 'fixed',
            'z-index': zOverlay,
            '&:empty': {
                // Hide the element when it doesn't have any child nodes. This doesn't
                // include overlays that have been detached, rather than disposed.
                display: 'none'
            }
        },
        // We use an extra wrapper element in order to use make the overlay itself a flex item.
        // This makes centering the overlay easy without running into the subpixel rendering
        // problems tied to using `transform` and without interfering with the other position
        // strategies.
        '.cdk-global-overlay-wrapper': {
            display: 'flex',
            position: 'absolute',
            'z-index': zOverlay
        },
        // A single overlay pane.
        '.cdk-overlay-pane': {
            position: 'absolute',
            'pointer-events': 'auto',
            'box-sizing': 'border-box',
            'z-index': zOverlay
        },
        '.cdk-overlay-backdrop': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            'z-index': zOverlay,
            'pointer-events': 'auto',
            '-webkit-tap-highlight-color': 'transparent',
            transition: 'opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
            opacity: 0,
            '&.cdk-overlay-backdrop-showing': {
                opacity: 1
            }
        },
        '.cdk-overlay-dark-backdrop': {
            background: 'rgba(0, 0, 0, 0.288)'
        },
        '.cdk-overlay-transparent-backdrop': {
            // Note: as of Firefox 57, having the backdrop be `background: none` will prevent it from
            // capturing the user's mouse scroll events. Since we also can't use something like
            // `rgba(0, 0, 0, 0)`, we work around the inconsistency by not setting the background at
            // all and using `opacity` to make the element transparent.
            '&, &.cdk-overlay-backdrop-showing': {
                opacity: 0
            }
        },
        // Used when disabling global scrolling.
        '.cdk-global-scrollblock': {
            position: 'fixed',
            // Necessary for the content not to lose its width. Note that we're using 100%, instead of
            // 100vw, because 100vw includes the width plus the scrollbar, whereas 100% is the width
            // that the element had before we made it `fixed`.
            width: '100%',
            // Note: this will always add a scrollbar to whatever element it is on, which can
            // potentially result in double scrollbars. It shouldn't be an issue, because we won't
            // block scrolling on a page that doesn't have a scrollbar in the first place.
            'overflow-y': 'scroll'
        }
    };
}
