var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var handsontable_css = require('handsontable/dist/handsontable.full.css');

import Handsontable from 'handsontable/dist/handsontable.full.js';

var SciSheetTableModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'), {
        _model_name : 'SciSheetTableModel',
        _view_name : 'SciSheetTableView',
        _model_module : 'jupyter_scisheets_widget',
        _view_module : 'jupyter_scisheets_widget',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0'
    })
});

var table_id = 0;

// Custom View. Renders the widget model.
var SciSheetTableView = widgets.DOMWidgetView.extend({
    render: function(){
        // CREATION OF THE WIDGET IN THE NOTEBOOK.

        // Add a <div> in the widget area.
        this.$table = $('<div />')
            .attr('id', 'table_' + (table_id++))
            .appendTo(this.$el);

        // Get the model's value (JSON);
        var json_model = this.model.get('_model_data');
        var json_header = this.model.get('_model_header');

        // Get the model's JSON string and parse it
        var datamod = JSON.parse(json_model);
        var headermod = JSON.parse(json_header);

        // Create the Handsontable table.
        this.$table.handsontable({
            data: datamod,
            colHeaders: headermod
        });
            
    },

    update: function() {
        // PYTHON --> JS UPDATE.
    
        // Get the model's value (JSON)
        var json_model = this.model.get('_model_data');
        var json_header = this.model.get('_model_header');
    
        // Get the model's JSON string, and parse it. 
        var datamod = JSON.parse(json_model);
        var headermod = JSON.parse(json_header);

        // Give it to the Handsontable widget.
        this.$table.handsontable({
            data: datamod,
            colHeaders: headermod
        });
    
        // Don't touch this...
        return SciSheetTableView.__super__.update.apply(this);
    },  
    
    // Tell Backbone to listen to the change event of input controls.
  
    events: {"change": "handle_table_change"},    

    handle_table_change: function(event) {
        // JS --> PYTHON UPDATE.

        // Get table instance
        var ht = this.$table.handsontable('getInstance');

        // Get the data and serialize it
        var json_vals = JSON.stringify(ht.getData());    
        var col_vals = JSON.stringify(ht.getColHeader());

        // Update the model with the JSON string.
        this.model.set('_model_data', json_vals);
        this.model.set('_model_header', col_vals);
    
        // Don't touch this...
        this.touch();
    },  

});

module.exports = {
    SciSheetTableModel: SciSheetTableModel,
    SciSheetTableView: SciSheetTableView
};
