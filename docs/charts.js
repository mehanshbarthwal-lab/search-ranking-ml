document.addEventListener('DOMContentLoaded', function() {
    // Common Chart.js options for the desired aesthetic
    Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    Chart.defaults.color = '#555';
    Chart.defaults.scale.grid.color = '#eee';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(26, 95, 122, 0.9)';
    
    const teal = '#1a5f7a';
    const tealLight = 'rgba(26, 95, 122, 0.5)';
    const gray = '#aaa';
    const grayLight = '#eaeaea';

    // 1. F1 Comparison Chart
    const ctx1 = document.getElementById('f1ComparisonChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: [
                'Rule baseline (circular)', 
                'RF, honest', 
                'RF, leaky', 
                'LogReg (random)', 
                'LogReg (grouped)', 
                'XGBoost (grouped)', 
                'LogReg + age', 
                'LogReg (tuned)'
            ],
            datasets: [{
                label: 'F1 Score',
                data: [1.000, 0.158, 0.703, 0.365, 0.350, 0.352, 0.341, 0.349],
                backgroundColor: [
                    grayLight, 
                    tealLight, 
                    gray, 
                    tealLight, 
                    teal, 
                    tealLight, 
                    tealLight, 
                    tealLight
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'F1 Score by Model and Split', padding: {bottom: 20} }
            },
            scales: {
                y: { beginAtZero: true, max: 1.0 },
                x: { ticks: { maxRotation: 45, minRotation: 45 } }
            }
        }
    });

    // 2. Threshold Sweep Chart
    const ctx2 = document.getElementById('thresholdSweepChart').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [0.10, 0.20, 0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.80, 0.90],
            datasets: [
                {
                    label: 'F1 Score',
                    data: [0.25, 0.30, 0.36, 0.389, 0.385, 0.381, 0.350, 0.295, 0.22, 0.134, 0.08, 0.03, 0.01],
                    borderColor: teal,
                    backgroundColor: teal,
                    tension: 0.4
                },
                {
                    label: 'Precision',
                    data: [0.18, 0.20, 0.23, 0.246, 0.25, 0.259, 0.282, 0.296, 0.32, 0.351, 0.38, 0.45, 0.5],
                    borderColor: '#e67e22',
                    backgroundColor: '#e67e22',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'F1 and Precision vs. Probability Threshold', padding: {bottom: 20} }
            },
            scales: {
                x: { title: { display: true, text: 'Threshold' } },
                y: { beginAtZero: true, max: 0.6, title: { display: true, text: 'Score' } }
            }
        }
    });

    // 3. Top-50 Composition Chart
    const ctx3 = document.getElementById('top50CompositionChart').getContext('2d');
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Top 50 Recommended Actions'],
            datasets: [
                { label: 'structural_fix', data: [28], backgroundColor: teal },
                { label: 'investigate_quiet_risk', data: [18], backgroundColor: '#3498db' },
                { label: 'verify_then_review', data: [4], backgroundColor: '#95a5a6' }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                title: { display: true, text: 'Action Composition in Top 50 Pages', padding: {bottom: 20} }
            },
            scales: {
                x: { stacked: true, max: 50 },
                y: { stacked: true, display: false }
            }
        }
    });

    // 4. K-Fold Distribution Chart
    const ctx4 = document.getElementById('kfoldDistributionChart').getContext('2d');
    new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ['5-fold GroupKFold F1 Spread'],
            datasets: [{
                label: 'F1 Range (0.296 - 0.378)',
                data: [[0.296, 0.378]],
                backgroundColor: tealLight,
                borderColor: teal,
                borderWidth: 2,
                borderSkipped: false
            },
            {
                label: 'Mean (0.340)',
                type: 'scatter',
                data: [{x: 0.340, y: 0}],
                backgroundColor: '#111',
                pointRadius: 6,
                pointStyle: 'rectRot'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                title: { display: true, text: 'Cross-Validation F1 Distribution', padding: {bottom: 20} },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.datasetIndex === 0) return 'Range: 0.296 - 0.378';
                            return 'Mean: 0.340 (std 0.034)';
                        }
                    }
                }
            },
            scales: {
                x: { min: 0.2, max: 0.45 },
                y: { display: false }
            }
        }
    });
});
