document.addEventListener('DOMContentLoaded', function() {
    Chart.defaults.font.family = "'STIX Two Text', 'Latin Modern Roman', 'Computer Modern', Georgia, serif";
    Chart.defaults.color = '#5a544a';
    Chart.defaults.scale.grid.color = '#e8e4d8';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(34, 32, 28, 0.9)';
    
    const accent = '#8c3a3a';      // Burgundy
    const accentLight = '#d49b9b'; // Lighter Burgundy
    const navy = '#3b5c7a';        // Deep Navy
    const gold = '#d4a373';        // Warm Gold
    const lightGrey = '#e3ded5';   // Very light warm grey

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
                    lightGrey, 
                    accentLight, 
                    navy, 
                    accentLight, 
                    accent, 
                    accentLight, 
                    accentLight, 
                    accentLight
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
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
                    borderColor: accent,
                    backgroundColor: accent,
                    tension: 0.4,
                    borderWidth: 2
                },
                {
                    label: 'Precision',
                    data: [0.18, 0.20, 0.23, 0.246, 0.25, 0.259, 0.282, 0.296, 0.32, 0.351, 0.38, 0.45, 0.5],
                    borderColor: navy,
                    backgroundColor: navy,
                    tension: 0.4,
                    borderWidth: 2,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
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
                { label: 'structural_fix', data: [28], backgroundColor: accent },
                { label: 'investigate_quiet_risk', data: [18], backgroundColor: navy },
                { label: 'verify_then_review', data: [4], backgroundColor: gold }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
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
                backgroundColor: accentLight,
                borderColor: accent,
                borderWidth: 2,
                borderSkipped: false
            },
            {
                label: 'Mean (0.340)',
                type: 'scatter',
                data: [{x: 0.340, y: 0}],
                backgroundColor: '#22201c',
                pointRadius: 6,
                pointStyle: 'rectRot'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
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
