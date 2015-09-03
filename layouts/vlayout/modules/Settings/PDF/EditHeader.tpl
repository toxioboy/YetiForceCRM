{*<!-- {[The file is published on the basis of YetiForce Public License that can be found in the following directory: licenses/License.html]} --!>*}
{strip}
    <div class="editContainer" style="padding-left: 3%;padding-right: 3%">
        <h3>
            {if $RECORDID eq ''}
                {vtranslate('LBL_CREATING_PDF',$QUALIFIED_MODULE)}
            {else}
                {vtranslate('LBL_EDITING_PDF',$QUALIFIED_MODULE)} : {vtranslate($PDF_MODEL->get('summary'), $QUALIFIED_MODULE)}
            {/if}
        </h3>
        <hr>
        <div id="breadcrumb">
            <ul class="crumbs marginLeftZero">
                <li class="first step"  style="z-index:9" id="step1">
                    <a>
                        <span class="stepNum">1</span>
                        <span class="stepText">{vtranslate('LBL_DOCUMENT_DESCRIPTION',$QUALIFIED_MODULE)}</span>
                    </a>
                </li>
                <li style="z-index:8" class="step" id="step2">
                    <a>
                        <span class="stepNum">2</span>
                        <span class="stepText">{vtranslate('LBL_DOCUMENT_SETTINGS',$QUALIFIED_MODULE)}</span>
                    </a>
                </li>
                <li class="step last" style="z-index:7" id="step3">
                    <a>
                        <span class="stepNum">3</span>
                        <span class="stepText">{vtranslate('LBL_DOCUMENT_HEADER',$QUALIFIED_MODULE)}</span>
                    </a>
                </li>
                <li class="step last" style="z-index:6" id="step4">
                    <a>
                        <span class="stepNum">4</span>
                        <span class="stepText">{vtranslate('LBL_DOCUMENT_BODY',$QUALIFIED_MODULE)}</span>
                    </a>
                </li>
                <li class="step last" style="z-index:5" id="step5">
                    <a>
                        <span class="stepNum">5</span>
                        <span class="stepText">{vtranslate('LBL_DOCUMENT_FOOTER',$QUALIFIED_MODULE)}</span>
                    </a>
                </li>
                <li class="step last" style="z-index:4" id="step6">
                    <a>
                        <span class="stepNum">6</span>
                        <span class="stepText">{vtranslate('LBL_DOCUMENT_EXCEPTIONS',$QUALIFIED_MODULE)}</span>
                    </a>
                </li>
                <li class="step last" style="z-index:3" id="step7">
                    <a>
                        <span class="stepNum">7</span>
                        <span class="stepText">{vtranslate('LBL_DOCUMENT_PERMISSIONS',$QUALIFIED_MODULE)}</span>
                    </a>
                </li>
                <li class="step last" style="z-index:2" id="step8">
                    <a>
                        <span class="stepNum">8</span>
                        <span class="stepText">{vtranslate('LBL_DOCUMENT_WATERMARK',$QUALIFIED_MODULE)}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="clearfix"></div>
    </div>
{/strip}
