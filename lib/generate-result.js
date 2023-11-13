module.exports = (answers, template) => {
  const domainResults = Object.keys(answers).map(key => {
    const answer = answers[key];
    const answerFacets = answer.facet;
    const domain = template.find(r => key === r.domain);

    const facetMapper = facet => {
      const answerFacet = answerFacets[facet.facet.toString()] || {};
      let scoreText = answerFacet.result;

      // Zamień "high" na "wysoko"
      if (scoreText === 'high') {
        scoreText = 'wysoko';
      }
      // Zamień "neutral" na "normalnie"
      else if (scoreText === 'neutral') {
        scoreText = 'normalnie';
      }
      // Zamień "low" na "nisko"
      else if (scoreText === 'low') {
        scoreText = 'nisko';
      }

      return Object.assign(facet, { scoreText, score: answerFacet.score, count: answerFacet.count });
    };

    const facets = domain.facets.map(facetMapper).map(facet => Object.assign({
      facet: facet.facet,
      title: facet.title,
      text: facet.text,
      score: facet.score,
      count: facet.count,
      scoreText: facet.scoreText
    }));

    const result = domain.results.find(r => r.score === answer.result);
    let scoreText = result.score;

    // Zamień "high" na "wysoko"
    if (scoreText === 'high') {
      scoreText = 'wysoko';
    }
    // Zamień "neutral" na "normalnie"
    else if (scoreText === 'neutral') {
      scoreText = 'normalnie';
    }
    // Zamień "low" na "nisko"
    else if (scoreText === 'low') {
      scoreText = 'nisko';
    }

    return {
      domain: domain.domain,
      title: domain.title,
      shortDescription: domain.shortDescription,
      description: domain.description,
      scoreText: scoreText,
      count: answer.count,
      score: answer.score,
      facets: facets.filter(f => f.score),
      text: result.text
    };
  });

  return domainResults;
};