window.showBack = ->
    dizmo.showBack()
    return

window.showFront = ->
    dizmo.showFront()
    return

window.i18n (error, t) ->
    cell = document.getElementsByClassName('table-cell')[0]
    cell.textContent = t '#front/greeting'
    done = document.getElementById 'done'
    done.textContent = t '#back/done'
    return

window.document.addEventListener 'dizmoready', ->
    done = document.getElementById 'done'
    done.onclick = -> dizmo.showFront()
    return
, {
    once: true
}
