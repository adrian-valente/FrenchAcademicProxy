// background.js
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    // Open the options page on first installation
    chrome.tabs.create({ url: 'options.html' });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    modifyURL(tabId, changeInfo.url);
  }
});

function modifyURL(tabId, url) {
  const urlObj = new URL(url);
  const domainParts = urlObj.hostname.split('.');

  // Use the selected modification type from storage
  const modificationType = 'modificationType'; // replace with your storage key
  const selectedType = 'INSERM'; // default to INSERM if not set

  chrome.storage.sync.get([modificationType], function (result) {
    const type = result[modificationType] || selectedType;
    let domainsToModify;

    if (type === 'INSERM') {
      domainsToModify = ["aacrjournals.org",
"academic.oup.com",
"acs.org",
"acw.elsevier.com",
"ajp.psychiatryonline.org",
"algebraicgeometry.nl",
"annualreviews.org",
"ar.iiarjournals.org",
"arabidopsis.org",
"asbmb.org",
"ascelibrary.org",
"ascopubs.org",
"ashpublications.org",
"asm.org",
"aspetjournals.org",
"bdsp.ehesp.fr",
"biochemsoctrans.org",
"biomedcentral.com",
"bioone.org",
"bioscientifica.com",
"bivi.afnor.org",
"books.ersjournals.com",
"brepolsonline.net",
"brillonline.com",
"cambridge.org",
"ccdc.cam.ac.uk",
"cell.com",
"cellpress.com",
"chadwyck.co.uk",
"chadwyck.com",
"classiques-garnier.com",
"clinical.diabetesjournals.org",
"cochranelibrary.com",
"cognet.mit.edu",
"content.iospress.com",
"crossref.org",
"degruyter.com",
"doi.org",
"els.net",
"ems-ph.org",
"experiments.springernature.com",
"facetsjournal.com",
"faseb.org",
"firstsearch.org",
"futuremedicine.com",
"genetics.org",
"hstalks.com",
"icsd.fiz-karlsruhe.de",
"incites.thomsonreuters.com",
"ingentaconnect.com",
"insight.jci.org",
"intmedpress.com",
"iopscience.iop.org",
"jamanetwork.com",
"jasn.asnjournals.org",
"jbc.org",
"jneurosci.org",
"jnm.snmjournals.org",
"journals.aai.org",
"journals.biologists.com",
"journals.bmj.com",
"journals.elsevier.com",
"journals.elsevierhealth.com",
"journals.physiology.org",
"journals.sagepub.com",
"journals.uchicago.edu",
"jove.com",
"jwatch.org",
"karger.com",
"liebertpub.com",
"link.springer.com",
"mic.microbiologyresearch.org",
"misha.fr",
"mitpressjournals.org",
"molbiolcell.org",
"myendnoteweb.com",
"nature.com",
"nejm.org",
"numeriquepremium.com",
"nutrition.org",
"onlinelibrary.wiley.com",
"openedition.org",
"ovidsp.ovid.com",
"oxfordjournals.org",
"plant.pathwaystudio.com",
"plantphysiol.org",
"plos.org",
"pnas.org",
"press.endocrine.org",
"projecteuclid.org",
"publications.edpsciences.org",
"pubmed.ncbi.nlm.nih.gov",
"pubs.acs.org",
"pubs.rsc.org",
"pubs.rsna.org",
"rechercheisidore.fr",
"reproduction-abstracts.org",
"researcherid.com",
"rnajournal.cshlp.org",
"rockefeller.edu",
"royalsociety.org",
"sandfonline.com",
"scahq.org",
"scielo.org",
"science.org",
"sciencedirect.com",
"sciencemag.org",
"sciencesconf.org",
"scifinder.cas.org",
"scopus.com",
"search.ebscohost.com",
"search.proquest.com",
"spandidos-publications.com",
"springer.com",
"springernature.com",
"tandfonline.com",
"taylorandfrancis.com",
"taylorfrancis.com",
"themeta.news",
"thieme-connect.com",
"webofknowledge.com"];
    } else if (type === 'CNRS') {
      domainsToModify = ["access.clarivate.com",
"apps.webofknowledge.com",
"biocyc.org",
"books.openedition.org",
"cognet.mit.edu",
"eebo.chadwyck.com",
"esi.clarivate.com",
"f1000.com",
"inis-cea.inist.fr",
"jcr.clarivate.com",
"jstor.org",
"link.springer.com",
"nature.com",
"onlinelibrary.wiley.com",
"publications.edpsciences.org",
"pubmed.ncbi.nlm.nih.gov",
"pubs.acs.org",
"repo.scoap3.org",
"search.ebscohost.com",
"themeta.news",
"arabidopsis.org",
"emeraldinsight.com",
"girinst.org",
"rsc.org",
"sciencedirect.com"];
    }

    // Check if the current domain matches any in the list
    for (const domainToModify of domainsToModify) {
      if (domainParts.length > 2 && domainParts.slice(-2).join('.') === domainToModify) {
        const extension = (type === 'INSERM') ? '.proxy.insermbiblio.inist.fr' : '.insb.bib.cnrs.fr';
        const modifiedDomain = `${domainParts.slice(0, -2).join('-')}-${domainParts.slice(-2).join('-')}${extension}`;
        urlObj.hostname = modifiedDomain;
        chrome.tabs.update(tabId, { url: urlObj.href });
        return;
      }
    }

    // If no modification is needed, update the tab with the original URL
    //chrome.tabs.update(tabId, { url: url });
  });
}
