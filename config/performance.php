<?php
/* +**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 * Contributor(s): YetiForce.com
 * ********************************************************************************** */
/* Performance paramters can be configured to fine tune vtiger CRM runtime */
$PERFORMANCE_CONFIG = [
	// Should the caller information be captured in SQL Logging?
	// It adds little overhead for performance but will be useful to debug. All data can be found in the table "l_yf_sqltime"
	'SQL_LOG_INCLUDE_CALLER' => false,
	// If database default charset is UTF-8, set this to true 
	// This avoids executing the SET NAMES SQL for each query!
	'DB_DEFAULT_CHARSET_UTF8' => true,
	// Turn-off default sorting in ListView, could eat up time as data grows
	'LISTVIEW_DEFAULT_SORTING' => false,
	// Compute list view record count while loading listview everytime.
	// Recommended value false
	'LISTVIEW_COMPUTE_PAGE_COUNT' => false,
	// Display administrators in the list of users (Assigned To)
	'SHOW_ADMINISTRATORS_IN_USERS_LIST' => true,
	// The numbers of emails downloaded during one scanning
	'NUMBERS_EMAILS_DOWNLOADED_DURING_ONE_SCANNING' => 100,
	// Enable automatic records list refreshing while changing the value of the selection list
	'AUTO_REFRESH_RECORD_LIST_ON_SELECT_CHANGE' => true,
	// Show in search engine/filters only users and groups available in records list. It might result in a longer search time.
	'SEARCH_SHOW_OWNER_ONLY_IN_LIST' => true,
	// Time to update number of notifications in seconds
	'INTERVAL_FOR_NOTIFICATION_NUMBER_CHECK' => 10,
	// Search owners by AJAX. We recommend selecting the "true" value if there are numerous users in the system.
	'SEARCH_OWNERS_BY_AJAX' => false,
	// Max number of exported records
	'MAX_NUMBER_EXPORT_RECORDS' => 500,
	// Minimum number of characters to search for record owner
	'OWNER_MINIMUM_INPUT_LENGTH' => 2,
	// In how many records should the global search permissions be updated in cron
	'CRON_MAX_NUMERS_RECORD_PRIVILEGES_UPDATER' => 1000,
];
