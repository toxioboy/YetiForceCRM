<?php

/**
 * Export to XML Class for PDF Settings
 * @package YetiForce.Action
 * @license licenses/License.html
 * @author Maciej Stencel <m.stencel@yetiforce.com>
 * @author Mariusz Krzaczkowski <m.krzaczkowski@yetiforce.com>
 */
class Settings_PDF_ExportTemplate_Action extends Settings_Vtiger_Index_Action
{

	public function process(Vtiger_Request $request)
	{
		$recordId = $request->get('id');
		$pdfModel = Vtiger_PDF_Model::getInstanceById($recordId);

		header('content-type: application/xml; charset=utf-8');
		header('Pragma: public');
		header('Cache-Control: private');
		header('Content-Disposition: attachment; filename=' . $recordId . '_pdftemplate.xml');
		header('Content-Description: PHP Generated Data');

		$xml = new DOMDocument('1.0', 'utf-8');
		$xml->preserveWhiteSpace = false;
		$xml->formatOutput = true;

		$xmlTemplate = $xml->createElement('pdf_template');
		$xmlFields = $xml->createElement('fields');
		$xmlField = $xml->createElement('field');

		$cDataColumns = ['header_content', 'body_content', 'footer_content', 'conditions'];
		foreach (Settings_PDF_Module_Model::$allFields as $field) {
			if (in_array($field, $cDataColumns)) {
				$name = $xmlField->appendChild($xml->createElement($field));
				$name->appendChild($xml->createCDATASection(html_entity_decode($pdfModel->getRaw($field))));
			} elseif ($field === 'watermark_image') {
				if (file_exists($pdfModel->get($field))) {
					$watermarkPath = $pdfModel->get($field);
					//$watermarkName = basename($watermarkPath);
					$im = file_get_contents($watermarkPath);
					$imData = base64_encode($im);

					$xmlColumn = $xml->createElement('imageblob', $imData);
					$xmlField->appendChild($xmlColumn);
					$value = $watermarkPath; //$watermarkName;
				} else {
					$value = '';
				}
				$xmlColumn = $xml->createElement($field, $value);
			} else {
				$value = $pdfModel->get($field);
				$xmlColumn = $xml->createElement($field, html_entity_decode($value, ENT_COMPAT, 'UTF-8'));
			}
			$xmlField->appendChild($xmlColumn);
		}

		$xmlFields->appendChild($xmlField);
		$xmlTemplate->appendChild($xmlFields);
		$xml->appendChild($xmlTemplate);
		print $xml->saveXML();
	}
}
