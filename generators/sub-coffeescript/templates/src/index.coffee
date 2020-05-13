###*
# Shows the `#back` side of a dizmo; assign to `window` to
# enable in the dizmo menu the *settings* entry.
# @function
###
export showBack = ->
    dizmo.showBack()
    return

window.showBack = showBack

###*
# Shows the `#front` side of a dizmo; assign to `window` to
# enable in the dizmo menu the *contents* entry.
# @function
###
export showFront = ->
    dizmo.showFront()
    return

window.showFront = showFront

###*
# Handler to be invoked once the translations are fetched;
# sets then the UI elements' text contents accordingly. The
# translations are in the `assets/locales` folder.
#
# @function
# @param {Error|null} error
#   Error if fetching the translations fails, otherwise null
# @param {Function} translator
#   Translator function
###
export onI18n = (error, t) ->
    cell = document.getElementsByClassName('table-cell')[0]
    cell.textContent = t '#front/greeting'
    done = document.getElementById 'done'
    done.textContent = t '#back/done'
    return

window.i18n onI18n

###*
# Handler to be invoked once the dizmo is ready.
# @function
###
export onDizmoReady = ->
    done = document.getElementById 'done'
    done.onclick = -> dizmo.showFront()
    return

window.document.addEventListener 'dizmoready', onDizmoReady, {
    once: true
}
