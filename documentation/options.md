## Options

The following Visual Studio Code settings are available for the mssql extension. These can be set in user preferences (cmd+,) or workspace settings ```(.vscode/settings.json)```.

```javascript
{
  "mssql.enableExperimentalFeatures": false,
  "mssql.azureActiveDirectory": "AuthCodeGrant",
  "mssql.logDebugInfo": false,
  "mssql.maxRecentConnections": 5,
  "mssql.shortcuts": {
    "_comment": "Short cuts must follow the format (ctrl)+(shift)+(alt)+[key]",
    "event.toggleResultPane": "ctrl+alt+R",
    "event.focusResultsGrid": "ctrl+alt+G",
    "event.toggleMessagePane": "ctrl+alt+Y",
    "event.prevGrid": "ctrl+up",
    "event.nextGrid": "ctrl+down",
    "event.copySelection": "ctrl+C",
    "event.copyWithHeaders": "",
    "event.copyAllHeaders": "",
    "event.maximizeGrid": "",
    "event.selectAll": "ctrl+A",
    "event.saveAsJSON": "",
    "event.saveAsCSV": "",
    "event.saveAsExcel": "",
    "event.changeColumnWidth": "ctrl+alt+S"
  },
  "mssql.messagesDefaultOpen": true,
  "mssql.resultsFontFamily": "-apple-system,BlinkMacSystemFont,Segoe WPC,Segoe UI,HelveticaNeue-Light,Ubuntu,Droid Sans,sans-serif",
  "mssql.resultsFontSize": 13,
  "mssql.saveAsCsv.includeHeaders": true,
  "mssql.saveAsCsv.delimiter": ",",
  "mssql.saveAsCsv.lineSeparator": null,
  "mssql.saveAsCsv.textIdentifier": "\"",
  "mssql.saveAsCsv.encoding": "utf-8",
  "mssql.copyIncludeHeaders": false,
  "mssql.copyRemoveNewLine": true,
  "mssql.showBatchTime": false,
  "mssql.splitPaneSelection": "next",
  "mssql.enableSqlAuthenticationProvider": true,
  "mssql.enableConnectionPooling": true,
  "mssql.format.alignColumnDefinitionsInColumns": false,
  "mssql.format.datatypeCasing": "none",
  "mssql.format.keywordCasing": "none",
  "mssql.format.placeCommasBeforeNextStatement": false,
  "mssql.format.placeSelectStatementReferencesOnNewLine": false,
  "mssql.applyLocalization": false,
  "mssql.intelliSense.enableIntelliSense": true,
  "mssql.intelliSense.enableErrorChecking": true,
  "mssql.intelliSense.enableSuggestions": true,
  "mssql.intelliSense.enableQuickInfo": true,
  "mssql.intelliSense.lowerCaseSuggestions": false,
  "mssql.persistQueryResultTabs": false,
  "mssql.enableQueryHistoryCapture": true,
  "mssql.enableQueryHistoryFeature": true,
  "mssql.tracingLevel": "Critical",
  "mssql.piiLogging": false,
  "mssql.logRetentionMinutes": 10080,
  "mssql.logFilesRemovalLimit": 100,
  "mssql.query.displayBitAsNumber": true,
  "mssql.query.maxCharsToStore": 65535,
  "mssql.query.maxXmlCharsToStore": 2097152,
  "mssql.queryHistoryLimit": 20,
  "mssql.query.rowCount": 0,
  "mssql.query.textSize": 2147483647,
  "mssql.query.executionTimeout": 0,
  "mssql.query.noCount": false,
  "mssql.query.noExec": false,
  "mssql.query.parseOnly": false,
  "mssql.query.arithAbort": true,
  "mssql.query.statisticsTime": false,
  "mssql.query.statisticsIO": false,
  "mssql.query.xactAbortOn": false,
  "mssql.query.transactionIsolationLevel": "READ COMMITTED",
  "mssql.query.deadlockPriority": "Normal",
  "mssql.query.lockTimeout": -1,
  "mssql.query.queryGovernorCostLimit": -1,
  "mssql.query.ansiDefaults": false,
  "mssql.query.quotedIdentifier": true,
  "mssql.query.ansiNullDefaultOn": true,
  "mssql.query.implicitTransactions": false,
  "mssql.query.cursorCloseOnCommit": false,
  "mssql.query.ansiPadding": true,
  "mssql.query.ansiWarnings": true,
  "mssql.query.ansiNulls": true,
  "mssql.query.alwaysEncryptedParameterization": false,
  "mssql.ignorePlatformWarning": false,
  "mssql.objectExplorer.groupBySchema": false,
  "mssql.objectExplorer.expandTimeout": 45
}
```
### Options Reference

| Option | Type | Description | Default Value | Values | 
|--------|------|-------------|---------------|--------| 
| mssql.enableExperimentalFeatures | boolean | Enables experimental features in the MSSQL extension. The features are not production-ready and may have bugs or issues. Restart Visual Studio Code after changing this setting. | false |  | 
| mssql.azureActiveDirectory | string | Chooses which Authentication method to use | AuthCodeGrant | AuthCodeGrant, DeviceCode | 
| mssql.logDebugInfo | boolean | [Optional] Log debug output to the VS Code console (Help -> Toggle Developer Tools) | false |  | 
| mssql.maxRecentConnections | number | The maximum number of recently used connections to store in the connection list. | 5 |  | 
| mssql.connections | array | Connection profiles defined in 'User Settings' are shown under 'MS SQL: Connect' command in the command palette. | undefined |  | 
| mssql.messagesDefaultOpen | boolean | True for the messages pane to be open by default; false for closed | true |  | 
| mssql.resultsFontFamily | string | Set the font family for the results grid; set to blank to use the editor font | -apple-system,BlinkMacSystemFont,Segoe WPC,Segoe UI,HelveticaNeue-Light,Ubuntu,Droid Sans,sans-serif |  | 
| mssql.resultsFontSize | number | Set the font size for the results grid; set to blank to use the editor size | 13 |  | 
| mssql.saveAsCsv.includeHeaders | boolean | [Optional] When true, column headers are included when saving results as CSV | true |  | 
| mssql.saveAsCsv.delimiter | string | [Optional] Delimiter for separating data items when saving results as CSV | , |  | 
| mssql.saveAsCsv.lineSeparator | string | [Optional] Character(s) used for separating rows when saving results as CSV | null |  | 
| mssql.saveAsCsv.textIdentifier | string | [Optional] Character used for enclosing text fields when saving results as CSV | " |  | 
| mssql.saveAsCsv.encoding | string | [Optional] File encoding used when saving results as CSV | utf-8 |  | 
| mssql.copyIncludeHeaders | boolean | [Optional] Configuration options for copying results from the Results View | false |  | 
| mssql.copyRemoveNewLine | boolean | [Optional] Configuration options for copying multi-line results from the Results View | true |  | 
| mssql.showBatchTime | boolean | [Optional] Should execution time be shown for individual batches | false |  | 
| mssql.splitPaneSelection | string | [Optional] Configuration options for which column new result panes should open in | next | next, current, end | 
| mssql.enableSqlAuthenticationProvider | boolean | Enables use of the Sql Authentication Provider for 'Microsoft Entra Id Interactive' authentication mode when user selects 'AzureMFA' authentication. This enables Server-side resource endpoint integration when fetching access tokens. This option is only supported for 'MSAL' Authentication Library. Please restart Visual Studio Code after changing this option. | true |  | 
| mssql.enableConnectionPooling | boolean | Enables connection pooling to improve overall connectivity performance. This setting is enabled by default. Visual Studio Code is required to be relaunched when the value is changed. To clear pooled connections, run the command: 'MS SQL: Clear Pooled Connections' | true |  | 
| mssql.format.alignColumnDefinitionsInColumns | boolean | Should column definitions be aligned? | false |  | 
| mssql.format.datatypeCasing | string | Should data types be formatted as UPPERCASE, lowercase, or none (not formatted) | none | none, uppercase, lowercase | 
| mssql.format.keywordCasing | string | Should keywords be formatted as UPPERCASE, lowercase, or none (not formatted) | none | none, uppercase, lowercase | 
| mssql.format.placeCommasBeforeNextStatement | boolean | should commas be placed at the beginning of each statement in a list e.g. ', mycolumn2' instead of at the end e.g. 'mycolumn1,' | false |  | 
| mssql.format.placeSelectStatementReferencesOnNewLine | boolean | Should references to objects in a select statements be split into separate lines? E.g. for 'SELECT C1, C2 FROM T1' both C1 and C2 will be on separate lines | false |  | 
| mssql.applyLocalization | boolean | [Optional] Configuration options for localizing into VSCode's configured locale (must restart VSCode for settings to take effect) | false |  | 
| mssql.intelliSense.enableIntelliSense | boolean | Should IntelliSense be enabled | true |  | 
| mssql.intelliSense.enableErrorChecking | boolean | Should IntelliSense error checking be enabled | true |  | 
| mssql.intelliSense.enableSuggestions | boolean | Should IntelliSense suggestions be enabled | true |  | 
| mssql.intelliSense.enableQuickInfo | boolean | Should IntelliSense quick info be enabled | true |  | 
| mssql.intelliSense.lowerCaseSuggestions | boolean | Should IntelliSense suggestions be lowercase | false |  | 
| mssql.persistQueryResultTabs | boolean | Should query result selections and scroll positions be saved when switching tabs (may impact performance) | false |  | 
| mssql.enableQueryHistoryCapture | boolean | Enable Query History Capture | true |  | 
| mssql.enableQueryHistoryFeature | boolean | Should Query History feature be enabled | true |  | 
| mssql.tracingLevel | string | [Optional] Log level for backend services. Azure Data Studio generates a file name every time it starts and if the file already exists the logs entries are appended to that file. For cleanup of old log files see logRetentionMinutes and logFilesRemovalLimit settings. The default tracingLevel does not log much. Changing verbosity could lead to extensive logging and disk space requirements for the logs. Error includes Critical, Warning includes Error, Information includes Warning and Verbose includes Information | Critical | All, Off, Critical, Error, Warning, Information, Verbose | 
| mssql.piiLogging | boolean | Should Personally Identifiable Information (PII) be logged in the Azure Logs output channel and the output channel log file. | false |  | 
| mssql.logRetentionMinutes | number | Number of minutes to retain log files for backend services. Default is 1 week. | 10080 |  | 
| mssql.logFilesRemovalLimit | number | Maximum number of old files to remove upon startup that have expired mssql.logRetentionMinutes. Files that do not get cleaned up due to this limitation get cleaned up next time Azure Data Studio starts up. | 100 |  | 
| mssql.query.displayBitAsNumber | boolean | Should BIT columns be displayed as numbers (1 or 0)? If false, BIT columns will be displayed as 'true' or 'false' | true |  | 
| mssql.query.maxCharsToStore | number | Maximum number of characters/bytes to store for each value in character/binary columns after running a query. Default value: 65,535. Valid value range: 1 to 2,147,483,647. | 65535 |  | 
| mssql.query.maxXmlCharsToStore | number | Maximum number of characters to store for each value in XML columns after running a query. Default value: 2,097,152. Valid value range: 1 to 2,147,483,647. | 2097152 |  | 
| mssql.queryHistoryLimit | number | Number of query history entries to show in the Query History view | 20 |  | 
| mssql.query.rowCount | number | Maximum number of rows to return before the server stops processing your query. | 0 |  | 
| mssql.query.textSize | number | Maximum size of text and ntext data returned from a SELECT statement | 2147483647 |  | 
| mssql.query.executionTimeout | number | An execution time-out of 0 indicates an unlimited wait (no time-out) | 0 |  | 
| mssql.query.noCount | boolean | Enable SET NOCOUNT option | false |  | 
| mssql.query.noExec | boolean | Enable SET NOEXEC option | false |  | 
| mssql.query.parseOnly | boolean | Enable SET PARSEONLY option | false |  | 
| mssql.query.arithAbort | boolean | Enable SET ARITHABORT option | true |  | 
| mssql.query.statisticsTime | boolean | Enable SET STATISTICS TIME option | false |  | 
| mssql.query.statisticsIO | boolean | Enable SET STATISTICS IO option | false |  | 
| mssql.query.xactAbortOn | boolean | Enable SET XACT_ABORT ON option | false |  | 
| mssql.query.transactionIsolationLevel | undefined | Enable SET TRANSACTION ISOLATION LEVEL option | READ COMMITTED | READ COMMITTED, READ UNCOMMITTED, REPEATABLE READ, SERIALIZABLE | 
| mssql.query.deadlockPriority | undefined | Enable SET DEADLOCK_PRIORITY option | Normal | Normal, Low | 
| mssql.query.lockTimeout | number | Enable SET LOCK TIMEOUT option (in milliseconds) | -1 |  | 
| mssql.query.queryGovernorCostLimit | number | Enable SET QUERY_GOVERNOR_COST_LIMIT | -1 |  | 
| mssql.query.ansiDefaults | boolean | Enable SET ANSI_DEFAULTS | false |  | 
| mssql.query.quotedIdentifier | boolean | Enable SET QUOTED_IDENTIFIER | true |  | 
| mssql.query.ansiNullDefaultOn | boolean | Enable SET ANSI_NULL_DFLT_ON | true |  | 
| mssql.query.implicitTransactions | boolean | Enable SET IMPLICIT_TRANSACTIONS | false |  | 
| mssql.query.cursorCloseOnCommit | boolean | Enable SET CURSOR_CLOSE_ON_COMMIT | false |  | 
| mssql.query.ansiPadding | boolean | Enable SET ANSI_PADDING | true |  | 
| mssql.query.ansiWarnings | boolean | Enable SET ANSI_WARNINGS | true |  | 
| mssql.query.ansiNulls | boolean | Enable SET ANSI_NULLS | true |  | 
| mssql.query.alwaysEncryptedParameterization | boolean | Enable Parameterization for Always Encrypted | false |  | 
| mssql.ignorePlatformWarning | boolean | [Optional] Do not show unsupported platform warnings | false |  | 
| mssql.objectExplorer.groupBySchema | boolean | When enabled, the database objects in Object Explorer will be categorized by schema. | false |  | 
| mssql.objectExplorer.expandTimeout | number | The timeout in seconds for expanding a node in Object Explorer. The default value is 45 seconds. | 45 |  | 
## mssql.shortcuts

| Shortcut | Default | 
|--------|------| 
| event.toggleResultPane | ctrl+alt+R | 
| event.focusResultsGrid | ctrl+alt+G | 
| event.toggleMessagePane | ctrl+alt+Y | 
| event.prevGrid | ctrl+up | 
| event.nextGrid | ctrl+down | 
| event.copySelection | ctrl+C | 
| event.copyWithHeaders |  | 
| event.copyAllHeaders |  | 
| event.maximizeGrid |  | 
| event.selectAll | ctrl+A | 
| event.saveAsJSON |  | 
| event.saveAsCSV |  | 
| event.saveAsExcel |  | 
| event.changeColumnWidth | ctrl+alt+S | 
