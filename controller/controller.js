
export function comprovaJugada(valueCartaOrigen, colourCartaOrigen, valueCartaDesti, colourCartaDesti) {
  if ((valueCartaDesti == valueCartaOrigen) || (colourCartaDesti == colourCartaOrigen))
    return true
  else
    return false
};

