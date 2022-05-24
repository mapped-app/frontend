const communityDictionary = {
    'ES-CT': 'Catalonia',
    'ES-VC': 'Valencia',
    'ES-MD': 'Madrid'
}

/**
 * 
 * @param {Mapped} ctx the Mapped object created.
 */
function changeState(ctx) {
    if (ctx.state === 'country') {
        ctx.state = 'community';
    } else {
        ctx.state = 'country';
    }
}

function changeLocation(ctx, placeId) {
    ctx.location = communityDictionary[placeId] || 'spain';
    changeState(ctx);
}

export { changeLocation };