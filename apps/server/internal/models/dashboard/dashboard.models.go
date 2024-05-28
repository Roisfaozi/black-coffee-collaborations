package report

type ReportDashboard struct {
	Total_price int32  `json:"total_price,omitempty" db:"total_price,omitempty" form:"total_price,omitempty"`
	Interval    string `json:"interval,omitempty" db:"interval,omitempty"`
}

type ReportDashboards []ReportDashboard
