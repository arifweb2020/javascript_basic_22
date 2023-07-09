import React, { useState } from 'react';
import InlineSVG from 'svg-inline-react';
import PlusIcon from 'assets/svg/actn-plus.svg';
import styles from './styles/metrics-table-items.scss';
import { Button, ButtonParams } from 'orion-rwc';
import { getIntlMessage } from 'utils/Translate';

const MetricsTableItems = () => {
  const [addNode, setAddNode] = useState(false);
  const [rows, setRows] = useState<any>([]);

  const plusIcon = <InlineSVG src={PlusIcon} className={styles.addItemIcon} raw={true} />;

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        nodeName: '',
        cadvisor: '',
        fileExporter: '',
        kubeState: '',
      },
    ]);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedRows: any = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
    };
    setRows(updatedRows);
  };

  const handleRemoveRow = (index: number) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.tableConatiner}>
      <table>
        <thead>
          <tr>
            <th>Node Name</th>
            <th>CAdvisor</th>
            <th>File Exporter</th>
            <th>Kube State</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input type="text" name="nodeName" value={row.nodeName} onChange={(e) => handleInputChange(e, index)} />
              </td>
              <td>
                <input type="text" name="cadvisor" value={row.cadvisor} onChange={(e) => handleInputChange(e, index)} />
              </td>
              <td>
                <input type="text" name="fileExporter" value={row.fileExporter} onChange={(e) => handleInputChange(e, index)} />
              </td>
              <td>
                <input type="text" name="kubeState" value={row.kubeState} onChange={(e) => handleInputChange(e, index)} />
              </td>
              <td>
                <Button text="Remove" onClick={() => handleRemoveRow(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {addNode ? (
        <div className={styles.addRowContainer}>
          <Button
            text={getIntlMessage('workflowEditorPage.metrics.labels.ADD_ROW')}
            icon={plusIcon}
            iconClassName={styles.addRowIcons}
            variant={ButtonParams.Variant.NO_BORDER}
            size={ButtonParams.Size.CUSTOM}
            onClick={handleAddRow}
          />
        </div>
      ) : (
        <div className={styles.blankContainer}>
          <span>{getIntlMessage('workflowEditorPage.metrics.addedMetricsCollection.MESSAGE')}</span>
          <Button
            text={getIntlMessage('workflowEditorPage.metrics.labels.ADD_NODE')}
            icon={plusIcon}
            iconClassName={styles.addRowIcons}
            variant={ButtonParams.Variant.NO_BORDER}
            size={ButtonParams.Size.CUSTOM}
            onClick={() => setAddNode(true)}
          />
        </div>
      )}
    </div>
  );
};

export default MetricsTableItems;
