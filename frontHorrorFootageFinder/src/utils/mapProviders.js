import React from 'react';

/** Cette fonction permet de mapper en strings les providers de chaque film.
 * @param {array} providerData La liste des providers en array (ex: currentMovieProviders.rent)
 * @returns {array} La liste des providers mappés en string.
 */
const mapProviders = (providerData) => {
  // Empêche de crasher si la liste est vide (map ne fonctionne pas avec un tableau vide)
  if (!providerData) {
    return null;
  }
  // Sinon, on process le tableau
  return (
    providerData.map(
      (provider, index) => (
        <span key={provider.provider_id}>
          {provider.provider_name}
          {/* On retire la virgule de séparation si nous sommes sur le dernier élément */}
          { index < providerData.length - 1 ? ', ' : '' }
        </span>
      ),
    ));
};

export default mapProviders;
